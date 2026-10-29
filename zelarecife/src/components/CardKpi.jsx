export default function CardKpi({ titulo, valor }) {
  return (
    <div className="kpi">
      <span className="kpi-titulo">{titulo}</span>
      <strong className="kpi-valor">{valor}</strong>
    </div>
  );
}