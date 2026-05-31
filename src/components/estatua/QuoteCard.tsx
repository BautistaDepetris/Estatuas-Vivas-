import Butterfly from './Butterfly';
interface QuoteCardProps {
    frase: string;
    autor: string;
}
export default function QuoteCard({ frase, autor }: QuoteCardProps) {
    return (<section>
      <span aria-hidden="true">
        &quot;
      </span>
      <div />
      <p>
        {frase}
      </p>
      <div />
      <p>
        - {autor}
      </p>
      <Butterfly />
    </section>);
}
