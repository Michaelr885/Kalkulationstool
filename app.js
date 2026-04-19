/**
 * Mobiles Aufmaß- & Kalkulations-Tool
 * Finale Logik inkl. Import/Export & Management
 */

class App {
    constructor() {
        this.config = APP_CONFIG;
        this.activeRohrklasse = null;
        this.activeDn = null;
        this.activeZeitfaktor = 1.0;
        
        // Projekt-Daten laden oder Initialisieren
        this.projekt = this.loadState() || {
            name: "Neues Projekt",
            activeSectionId: null,
            sections: []
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.renderRohrklassen();
        this.renderZeitfaktoren();
        this.renderSonderleistungen();
        
        document.getElementById('projectNameDisplay').innerText = this.projekt.name;
        this.updateSectionSelect();
        
        if (this.config.rohrklassen.length > 0) {
            this.selectRohrklasse(this.config.rohrklassen[0].id);
        }

        this.checkState();
        lucide.createIcons();
    }

    bindEvents() {
        document.getElementById('addSectionBtn').onclick = () => this.addSection();
        document.getElementById('deleteSectionBtn').onclick = () => this.deleteSection();
        document.getElementById('duplicateSectionBtn').onclick = () => this.duplicateSection();
        document.getElementById('resetProjectBtn').onclick = () => this.resetProject();
        document.getElementById('exportJsonBtn').onclick = () => this.exportJson();
        document.getElementById('exportSupplierBtn').onclick = () => this.exportSupplierList();
        document.getElementById('mobileRohrklasseBtn').onclick = () => this.toggleRohrklasseOverlay(true);
        
        // Import Logik
        const importBtn = document.getElementById('importJsonBtn');
        const fileInput = document.getElementById('importFileInput');
        
        importBtn.onclick = () => fileInput.click();
        fileInput.onchange = (e) => this.importJson(e);
    }

    // --- State Management ---

    saveState() {
        localStorage.setItem('kalkulationsTool_Projekt', JSON.stringify(this.projekt));
    }

    loadState() {
        const data = localStorage.getItem('kalkulationsTool_Projekt');
        return data ? JSON.parse(data) : null;
    }

    checkState() {
        const emptyState = document.getElementById('emptyState');
        const appInterface = document.getElementById('appInterface');
        const sectionTitle = document.getElementById('currentSectionTitle');
        
        if (this.projekt.sections.length === 0) {
            emptyState.style.display = 'flex';
            appInterface.style.display = 'none';
            sectionTitle.innerText = "Keine Sektion";
            this.projekt.activeSectionId = null;
        } else {
            emptyState.style.display = 'none';
            appInterface.style.display = 'block';
            const activeSec = this.projekt.sections.find(s => s.id === this.projekt.activeSectionId);
            sectionTitle.innerText = activeSec ? activeSec.name : "Sektion wählen";
        }
        this.renderProject();
    }

    // --- Management Methoden ---

    renameProject() {
        const name = prompt("Projekt-Name ändern:", this.projekt.name);
        if (name && name.trim() !== "") {
            this.projekt.name = name.trim();
            document.getElementById('projectNameDisplay').innerText = this.projekt.name;
            this.saveState();
        }
    }

    addSection() {
        const name = prompt("Name der neuen Sektion (z.B. Raum-Nr / Iso-Nr):");
        if (name && name.trim() !== "") {
            const id = "sec_" + Date.now();
            this.projekt.sections.push({ id: id, name: name.trim(), positionen: [] });
            this.projekt.activeSectionId = id;
            this.updateSectionSelect();
            this.saveState();
            this.checkState();
        }
    }

    deleteSection() {
        if (!this.projekt.activeSectionId) return;
        const current = this.projekt.sections.find(s => s.id === this.projekt.activeSectionId);
        if (confirm(`Sektion "${current.name}" wirklich löschen?`)) {
            this.projekt.sections = this.projekt.sections.filter(s => s.id !== this.projekt.activeSectionId);
            this.projekt.activeSectionId = this.projekt.sections.length > 0 ? this.projekt.sections[0].id : null;
            this.updateSectionSelect();
            this.saveState();
            this.checkState();
        }
    }

    duplicateSection() {
        if (!this.projekt.activeSectionId) return;
        const current = this.projekt.sections.find(s => s.id === this.projekt.activeSectionId);
        const newId = "sec_copy_" + Date.now();
        this.projekt.sections.push({
            id: newId,
            name: `${current.name} (Kopie)`,
            positionen: JSON.parse(JSON.stringify(current.positionen)).map(p => ({ ...p, id: Date.now() + Math.random().toString() }))
        });
        this.projekt.activeSectionId = newId;
        this.updateSectionSelect();
        this.saveState();
        this.checkState();
    }

    resetProject() {
        if (confirm("🚨 ACHTUNG: Möchten Sie das KOMPLETTE Projekt wirklich unwiderruflich löschen? Alle Sektionen und Positionen gehen verloren.")) {
            localStorage.removeItem('kalkulationsTool_Projekt');
            location.reload();
        }
    }

    updateSectionSelect() {
        const select = document.getElementById('sectionSelect');
        if (this.projekt.sections.length === 0) {
            select.innerHTML = `<option value="">Keine Sektion</option>`;
            return;
        }
        select.innerHTML = this.projekt.sections.map(s => 
            `<option value="${s.id}" ${s.id === this.projekt.activeSectionId ? 'selected' : ''}>${s.name}</option>`
        ).join('');

        select.onchange = (e) => {
            this.projekt.activeSectionId = e.target.value;
            this.saveState();
            this.checkState();
        };
    }

    // --- Rohrklassen & UI ---

    renderRohrklassen() {
        const select = document.getElementById('rohrklasseSelect');
        const list = document.getElementById('rohrklasseList');
        select.innerHTML = this.config.rohrklassen.map(rk => `<option value="${rk.id}">${rk.name}</option>`).join('');
        select.onchange = (e) => this.selectRohrklasse(e.target.value);
        list.innerHTML = this.config.rohrklassen.map(rk => `<div class="overlay-item" onclick="app.selectRohrklasse('${rk.id}'); app.toggleRohrklasseOverlay(false);">${rk.name}</div>`).join('');
    }

    selectRohrklasse(id) {
        this.activeRohrklasse = this.config.rohrklassen.find(rk => rk.id === id);
        document.getElementById('rohrklasseSelect').value = id;
        document.getElementById('activeRohrklasseName').innerText = this.activeRohrklasse.name;
        this.renderDimensionen();
        this.selectDn(this.activeRohrklasse.dimensionen[0]);
    }

    toggleRohrklasseOverlay(show) {
        document.getElementById('rohrklasseOverlay').style.display = show ? 'flex' : 'none';
    }

    renderZeitfaktoren() {
        const container = document.getElementById('zeitfaktorGroup');
        container.innerHTML = this.config.zeitfaktoren.map(zf => `
            <div class="radio-group">
                <input type="radio" name="zeitfaktor" id="zf_${zf.id}" value="${zf.faktor}" ${zf.faktor === this.activeZeitfaktor ? 'checked' : ''}>
                <label for="zf_${zf.id}">${zf.faktor}x ${zf.name.split(' ')[0]}</label>
            </div>
        `).join('');
        container.querySelectorAll('input').forEach(i => i.onchange = (e) => this.activeZeitfaktor = parseFloat(e.target.value));
    }

    renderSonderleistungen() {
        const container = document.getElementById('sonderleistungenToolbar');
        container.innerHTML = this.config.sonderleistungen.map(sl => `
            <button class="btn-icon" title="${sl.bezeichnung}" onclick="app.addSonderleistung('${sl.id}')">
                <i data-lucide="${this.getIconForService(sl.id)}"></i>
            </button>
        `).join('');
        lucide.createIcons();
    }

    renderDimensionen() {
        const container = document.getElementById('dnSelector');
        container.innerHTML = this.activeRohrklasse.dimensionen.map(dn => `
            <button class="dn-btn ${dn === this.activeDn ? 'active' : ''}" onclick="app.selectDn('${dn}')">${dn}</button>
        `).join('');
    }

    selectDn(dn) {
        this.activeDn = dn;
        document.querySelectorAll('.dn-btn').forEach(btn => btn.classList.toggle('active', btn.innerText === dn));
        this.renderActionBoard();
    }

    renderActionBoard() {
        const container = document.getElementById('actionBoard');
        container.innerHTML = this.activeRohrklasse.bauteile.map(bt => {
            if (bt.eingabe_art === 'klick' || bt.eingabe_art === 'zweite_dn_auswahl') {
                return `<div class="kachel" onclick="app.handleAction('${bt.id}')"><i data-lucide="${this.getIconForBauteil(bt.id)}"></i><span class="kachel-label">${bt.bezeichnung}</span></div>`;
            } else {
                return `<div class="kachel eingabe-kachel"><span class="kachel-label">${bt.bezeichnung} (${bt.einheit})</span><div class="input-wrapper"><input type="number" id="input_${bt.id}" placeholder="0.0" step="0.1"><button class="add-btn" onclick="app.handleAddInput('${bt.id}')"><i data-lucide="plus"></i></button></div></div>`;
            }
        }).join('');
        lucide.createIcons();
    }

    // --- Logik ---

    handleAction(btId) {
        const bt = this.activeRohrklasse.bauteile.find(b => b.id === btId);
        if (bt.erlaubte_dns && !bt.erlaubte_dns.includes(this.activeDn)) {
            alert(`${bt.bezeichnung} nicht verfügbar für ${this.activeDn}`); return;
        }
        if (bt.eingabe_art === 'zweite_dn_auswahl') this.openSecondDnModal(bt);
        else this.addEntry(bt, 1);
    }

    handleAddInput(btId) {
        const input = document.getElementById(`input_${btId}`);
        const m = parseFloat(input.value);
        if (isNaN(m) || m <= 0) return;
        const bt = this.activeRohrklasse.bauteile.find(b => b.id === btId);
        this.addEntry(bt, m); input.value = '';
    }

    addSonderleistung(slId) { this.addEntry(this.config.sonderleistungen.find(s => s.id === slId), 1, "Global"); }

    addEntry(bt, m, cDn = null) {
        const sec = this.projekt.sections.find(s => s.id === this.projekt.activeSectionId);
        if (!sec) return;
        const dn = cDn || this.activeDn;
        const f = this.activeZeitfaktor;
        const exist = sec.positionen.find(p => p.bauteilId === bt.id && p.dn === dn && p.faktor === f);
        if (exist) { exist.menge += m; } 
        else {
            sec.positionen.push({ id: Date.now() + Math.random().toString(), bauteilId: bt.id, bezeichnung: bt.bezeichnung, rib: bt.rib_nummer, dn: dn, menge: m, einheit: bt.einheit, faktor: f, basisZeit: bt.zeit_in_minuten });
        }
        this.saveState(); this.renderProject();
    }

    deleteEntry(id) {
        const sec = this.projekt.sections.find(s => s.id === this.projekt.activeSectionId);
        sec.positionen = sec.positionen.filter(p => p.id !== id);
        this.saveState(); this.renderProject();
    }

    updateQuantity(id, m) {
        const sec = this.projekt.sections.find(s => s.id === this.projekt.activeSectionId);
        const p = sec.positionen.find(x => x.id === id);
        if (p) { p.menge = parseFloat(m) || 0; this.saveState(); this.renderProject(); }
    }

    renderProject() {
        const tableBody = document.getElementById('positionTableBody');
        const totalDisp = document.getElementById('totalTimeDisplay');
        if (!this.projekt.activeSectionId) { tableBody.innerHTML = ''; totalDisp.innerText = "0.0 min"; return; }
        
        const sec = this.projekt.sections.find(s => s.id === this.projekt.activeSectionId);
        let total = 0;
        tableBody.innerHTML = (sec.positionen || []).map(p => {
            const z = (p.basisZeit * p.faktor) * p.menge; total += z;
            return `<tr><td><div style="font-weight: 600;">${p.bezeichnung}</div><div style="font-size: 0.7rem; color: var(--text-muted);">RIB: ${p.rib} | F: ${p.faktor}x</div></td><td>${p.dn}</td><td><div style="display: flex; align-items: center; gap: 4px;"><input type="number" value="${p.menge}" step="0.1" style="width: 50px; background-color: var(--bg-base); border: 1px solid var(--border-subtle); color: var(--text-main); border-radius: 4px; padding: 4px; outline: none; font-size: 0.8rem;" onchange="app.updateQuantity('${p.id}', this.value)"><span style="font-size: 0.7rem;">${p.einheit}</span></div></td><td>${z.toFixed(1)}</td><td><button class="btn-icon" style="border:none; background:none; height:auto; width:auto; padding: 0;" onclick="app.deleteEntry('${p.id}')"><i data-lucide="trash-2" style="color: var(--danger); width: 14px;"></i></button></td></tr>`;
        }).join('');
        totalDisp.innerText = `${total.toFixed(1)} min`;
        lucide.createIcons();
    }

    // --- Modals ---
    toggleModal(id, show) { document.getElementById(id).style.display = show ? 'flex' : 'none'; }
    
    openSecondDnModal(bt) {
        const grid = document.getElementById('secondDnGrid');
        document.getElementById('modalError').style.display = 'none';
        this.toggleModal('secondDnModal', true);
        document.getElementById('secondDnModalTitle').innerText = `${bt.bezeichnung} - Ziel`;
        grid.innerHTML = this.activeRohrklasse.dimensionen.map(dn => `<button class="dn-btn" onclick="app.handleSecondDnSelect('${bt.id}', '${dn}')">${dn}</button>`).join('');
    }

    handleSecondDnSelect(btId, targetDn) {
        const bt = this.activeRohrklasse.bauteile.find(b => b.id === btId);
        const valid = bt.gueltige_kombinationen ? bt.gueltige_kombinationen[this.activeDn] : null;
        if (!valid || !valid.includes(targetDn)) {
            const err = document.getElementById('modalError'); err.innerText = `Kombination ${this.activeDn}/${targetDn} ungültig!`; err.style.display = 'block'; return;
        }
        this.addEntry(bt, 1, `${this.activeDn}/${targetDn}`);
        this.toggleModal('secondDnModal', false);
    }

    // --- Export / Import ---

    exportJson() {
        const b = new Blob([JSON.stringify(this.projekt, null, 2)], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `projekt_${this.projekt.name}.json`; a.click();
    }

    importJson(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (imported.name && Array.isArray(imported.sections)) {
                    this.projekt = imported;
                    this.projekt.activeSectionId = imported.sections.length > 0 ? imported.sections[0].id : null;
                    this.saveState();
                    location.reload(); // Einfachster Weg um alles neu zu initialisieren
                } else {
                    alert("Ungültiges Dateiformat!");
                }
            } catch (err) {
                alert("Fehler beim Lesen der Datei!");
            }
        };
        reader.readAsText(file);
    }

    exportSupplierList() {
        const agg = {}; this.projekt.sections.forEach(s => s.positionen.forEach(p => { const k = `${p.bezeichnung}|${p.dn}`; agg[k] = agg[k] || { b: p.bezeichnung, d: p.dn, m: 0, e: p.einheit }; agg[k].m += p.menge; }));
        let t = `STÜCKLISTE: ${this.projekt.name}\n\n`; Object.values(agg).forEach(i => t += `${i.m.toFixed(2)} ${i.e} ${i.b} (${i.d})\n`);
        navigator.clipboard.writeText(t).then(() => alert("Kopiert!"));
    }

    getIconForBauteil(id) { const i = { 'bogen_90': 'corner-up-right', 't_stueck': 'split', 'schweissnaht': 'zap', 'reduzierung': 'minimize-2', 'flansch': 'circle-dashed', 'rohr': 'activity' }; return i[id] || 'plus-circle'; }
    getIconForService(id) { const i = { 'freigabe': 'shield-check', 'druckprobe': 'gauge', 'baustelle_einrichten': 'home' }; return i[id] || 'star'; }
}

const app = new App();
