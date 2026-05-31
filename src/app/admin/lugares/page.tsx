'use client';
import { useState } from 'react';
import FramedPainting from '@/components/estatua/FramedPainting';
interface LugarPueblo {
    id: string;
    nombre: string;
    descripcion: string;
    categoria: string;
    imagen_url: string;
}
const LUGARES_INICIALES: LugarPueblo[] = [
    {
        id: '1',
        nombre: 'Capilla Brochero',
        descripcion: 'El recinto donde oficio sus ultimas misas. Patrimonio historico provincial desde 1983.',
        categoria: 'Patrimonio Religioso',
        imagen_url: '',
    },
    {
        id: '2',
        nombre: 'Iglesia San Lorenzo',
        descripcion: 'El edificio historico del pueblo, epicentro de la devocion desde 1887.',
        categoria: 'Patrimonio Religioso',
        imagen_url: '',
    },
    {
        id: '3',
        nombre: 'Plaza Central',
        descripcion: 'El corazon civico de Villa San Lorenzo desde su fundacion.',
        categoria: 'Espacio Publico',
        imagen_url: '',
    },
    {
        id: '4',
        nombre: 'Sendero de las Sierras',
        descripcion: 'El camino que Brochero recorrio innumerables veces.',
        categoria: 'Naturaleza',
        imagen_url: '',
    },
];
export default function AdminLugaresPage() {
    const [lugares, setLugares] = useState<LugarPueblo[]>(LUGARES_INICIALES);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [form, setForm] = useState({ nombre: '', descripcion: '', categoria: '', imagen_url: '' });
    const agregarLugar = () => {
        if (!form.nombre)
            return;
        setLugares((prev) => [...prev, { id: Date.now().toString(), ...form }]);
        setForm({ nombre: '', descripcion: '', categoria: '', imagen_url: '' });
        setMostrarFormulario(false);
    };
    return (<section>
      <div>
        <div>
          <p>
            <span />
            Pueblo
          </p>
          <h1>Lugares.</h1>
        </div>
        <button onClick={() => setMostrarFormulario((value) => !value)}>
          {mostrarFormulario ? 'Cancelar' : '+ Agregar lugar'}
        </button>
      </div>

      {mostrarFormulario && (<div>
          <div>
            {(['nombre', 'descripcion', 'categoria', 'imagen_url'] as const).map((key) => (<label key={key}>
                {key}
                <input value={form[key]} onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))} placeholder={key}/>
              </label>))}
          </div>
          <button onClick={agregarLugar}>
            Guardar lugar
          </button>
        </div>)}

      <div>
        {lugares.map((lugar, index) => (<article key={lugar.id}>
            <FramedPainting src={lugar.imagen_url || null} alt={lugar.nombre} width={74} height={74} tone={index % 2 === 0 ? 'pastoral' : 'sepia'}/>
            <div>
              <p>{lugar.categoria}</p>
              <h2>{lugar.nombre}</h2>
              <p>{lugar.descripcion}</p>
            </div>
            <button onClick={() => setLugares((prev) => prev.filter((item) => item.id !== lugar.id))}>
              Eliminar
            </button>
          </article>))}
      </div>
    </section>);
}
