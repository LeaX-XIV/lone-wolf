import React from 'react';

const disciplines = [
	{
		_id: 0,
		name: "Mimetismo",
		description: "Questa Disciplina permette a un Cavaliere Kai d iadattarsi all'ambiente circostante. All'aperto, in campagna, può nascondersi tra alberi e rocce e passarevisino al nemico senza essere scoperto. In città e nei centri abitati lo rende, invece, capace di comportarsi e di parlare come un nativo del posto. Può anche aiutarlo a trovare un rifugio o un nascondiglio sicuro."
	},
	{
		_id: 1,
		name: "Caccia",
		description: "Questa Disciplina permette a un Cavaliere Kai di non morire di fame quando si trova in un ambiente selvaggio. Sarà sempre in grado di cacciare per procurarsi del cibo, tranne che in territori desolai e nel deserto. È inoltre una tecnica che gli consente di muoversi agilmente senza fare rumore durante l'inseguimento della sua preda."
	},
	{
		_id: 2,
		name: "Sesto Senso",
		description: "Questa Disciplina avverte chi la possiede di un pericolo imminente. Permette anche di capire la vera natura di uno sconosciuto o di uno strano oggetto incontrato nel corso dell'avventura."
	},
	{
		_id: 3,
		name: "Orientamento",
		description: "Questa Disciplina permette a un Cavaliere Kai di scegliere il percorso giusto anche in un territorio selvaggio, di scoprire l'ubicazione di una persona o di un oggetto in zone abitate e di leggere i segreti delle tracce e delle impronte."
	},
	{
		_id: 4,
		name: "Guarigione",
		description: "Questa disciplina serve a recuperare i punti di RESISTENZA persi in combattimento. Se possiedi quest'abilità, puoi recuperare 1 punto di RESISTENZA ogni volta che superi un paragrafo numerato senza essere impegnato in un combattimento."
	},
	{
		_id: 5,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. Il pugnale è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 6,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. La lancia è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 7,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. La mazza è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 8,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. La daga è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 9,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. Il martello da guerra è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 10,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. La spada è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 11,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. L'ascia è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 12,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. La spada è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 13,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. L'asta è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 14,
		name: "Scherma",
		description: "Quando entra nel Monastero Kai, ogni allievo impara ad usare perfettamente un tipo di arma. Lo spadone è l'arma in cui sei maestro. Se ti capiterà di affrontare un combattimento con tale arma, aggiungi 2 punti alla tua COMBATTIVITÀ."
	},
	{
		_id: 15,
		name: "Psicoschermo",
		description: "I Signori delle Tenebre e molti degli esseri malvagi loro servitori possono attaccarti con il loro Psicolaser. La Disciplina Kai dello Psicoschermo ti consente di non perdere punti di RESISTENZA se sei sottoposto a questa forma di attacco."
	},
	{
		_id: 16,
		name: "Psicolaser",
		description: "Questa tecnica permette a un Cavaliere Kai di attaccare i nemici con la forza della mente. Può essere usata inseime alle armi normali e aggiunge 2 punti alla tua COMBATTIVITÀ. Non tutte le creature possono essere ferite con lo Psicolaser."
	},
	{
		_id: 17,
		name: "Affinità Animale",
		description: "Questa Disciplina permette a un Cavaliere Kai di comunicare con alcuni animali e di capire le intenzioni di altri. In certi casi può consentire di controllare i loro istinti e il loro comportamento."
	},
	{
		_id: 18,
		name: "Telecinesi",
		description: "La padronanza di questa tecnica consente a un Cavaliere Kai di muovere piccoli oggetti semplicemente concentrandosi."
	},
]


export const KaiDisciplinesContext = React.createContext({
	getKaiDisciplines: () => disciplines,
	getDisciplineFromId: (id) => disciplines[id] || undefined
});