interface EditorialNumProps {
    num: string;
    label: string;
    line?: boolean;
}
export default function EditorialNum({ num, label, line = true }: EditorialNumProps) {
    return (<div>
      <span>/{num}</span>
      {line && <span />}
      <span>{label}</span>
    </div>);
}
