import './Conocimiento.css'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer} from 'recharts'


const data = [
  { name: 'Bajo', value: 48.4, percentage: '48.4%', fill: '#5fa7e4' },
  { name: 'Medio', value: 34.4, percentage: '34.4%', fill: '#efad50' },
  { name: 'Muy bajo', value: 10.9, percentage: '10.9%', fill: '#be3a2a' },
  { name: 'Alto', value: 4.7, percentage: '4.7%', fill: '#3fbca8' },
  { name: 'Muy alto', value: 1.6, percentage: '1.6%', fill: '#9463ae' },
].map(item => ({...item, legendText: `${item.name} (${item.percentage})` }));


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, percentage, fill } = payload[0].payload;
    const tooltipText = `${name}: ${percentage}`;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ width: '10px', height: '10px', backgroundColor: fill, marginRight: '10px' }}></div>
        <p className="label" style={{ color: fill, fontSize: '1rem', fontFamily: 'Nunito, sans-serif' }}>{tooltipText}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ data }) => (
  <ul className="conocimiento-legend">
    {data.map((item, i) => (
      <li key={i} className="conocimiento-legend-item">
        <span className="conocimiento-legend-dot" style={{ backgroundColor: item.fill }} />
        <span>{item.name} ({item.percentage})</span>
      </li>
    ))}
  </ul>
);

export default function Conocimiento() {
    return(
        <section className='conocimiento-conteiner'>
            <div className='conocimiento-conteiner-full'>

                <div className='conocimiento-izq'>
                    <p className='nunito-btn-font pretitle-conocimiento'>Datos de la comunidad</p>
                    <h3 className='nunito-font title-conocimiento'>Nivel de conocimiento sobre el autismo</h3>
                    <p className='lora-font desc-conocimiento'>Los resultados de nuestra encuesta muestran que la mayoría de las personas presentan un nivel de conocimiento bajo o medio sobre la temática, mientras que solo una pequeña proporción manifiesta tener un conocimiento alto o muy alto.</p>
                    <p className='lora-font desc-conocimiento'>Esto evidencia la necesidad de continuar promoviendo acciones de información, capacitación y concientización en la comunidad.</p>   
                </div>

        <div className='conocimiento-der'>
          <ResponsiveContainer width="100%" height={320} minWidth={250}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={80} outerRadius={120}
                fill="#8884d8" paddingAngle={5} dataKey="value" stroke="none">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <CustomLegend data={data} />
        </div>
            </div>
        </section>
    )
}