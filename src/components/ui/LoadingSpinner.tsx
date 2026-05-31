export default function LoadingSpinner({
  texto = 'Cargando...',
}: {
  texto?: string
}) {
  return (
    <div>
      <p>{texto}</p>
    </div>
  )
}
