export default function Card({ nombre, edad, profesion }) {
  return (
    <div className="card">
      <h2>{nombre}</h2>
      <p><strong>Edad:</strong> {edad}</p>
      <p><strong>Profesión:</strong> {profesion}</p>
    </div>
  );
}