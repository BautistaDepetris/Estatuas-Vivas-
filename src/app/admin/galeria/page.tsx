'use client';
import { useState } from 'react';
import FramedPainting from '@/components/estatua/FramedPainting';
interface FotoGaleria {
    id: string;
    url: string;
    titulo: string;
    descripcion: string;
    categoria: string;
}
const FOTOS_INICIALES: FotoGaleria[] = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
        titulo: 'Sierras al Atardecer',
        descripcion: 'Las sierras cordobesas en hora dorada.',
        categoria: 'Paisaje',
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
        titulo: 'Caminos de Altura',
        descripcion: 'Senderos por las sierras.',
        categoria: 'Naturaleza',
    },
];
export default function AdminGaleriaPage() {
    const [fotos, setFotos] = useState<FotoGaleria[]>(FOTOS_INICIALES);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [form, setForm] = useState({ url: '', titulo: '', descripcion: '', categoria: '' });
    const agregarFoto = () => {
        if (!form.url || !form.titulo)
            return;
        setFotos((prev) => [...prev, { id: Date.now().toString(), ...form }]);
        setForm({ url: '', titulo: '', descripcion: '', categoria: '' });
        setMostrarFormulario(false);
    };
    return (<section>
      <div>
        <div>
          <p>
            <span />
            Archivo visual
          </p>
          <h1>Galeria.</h1>
        </div>
        <button onClick={() => setMostrarFormulario((value) => !value)}>
          {mostrarFormulario ? 'Cancelar' : '+ Agregar foto'}
        </button>
      </div>

      {mostrarFormulario && (<div>
          <div>
            {(['url', 'titulo', 'descripcion', 'categoria'] as const).map((key) => (<label key={key}>
                {key}
                <input value={form[key]} onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))} placeholder={key === 'url' ? 'https://images.unsplash.com/...' : key}/>
              </label>))}
          </div>
          <button onClick={agregarFoto}>
            Guardar fotografia
          </button>
        </div>)}

      <div>
        {fotos.map((foto, index) => (<article key={foto.id}>
            <FramedPainting src={foto.url} alt={foto.titulo} height={160} tone={index % 2 === 0 ? 'sepia' : 'sky'}/>
            <div>
              <p>{foto.categoria}</p>
              <h2>{foto.titulo}</h2>
              <p>{foto.descripcion}</p>
            </div>
          </article>))}
      </div>
    </section>);
}
