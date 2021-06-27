// usando typagem do typescript
type ButtonProps = {
    // quando tem ? é opcional
    text?: string;
    number?: number;
    // posso também receber o children
    // ele é o contéudo que fica dentro de uma tag
    children?: string
}

// tipando a props dizendo que é do tipo ButtonProps
export function Button(props: ButtonProps) {
    return (
        <button>{props.text}-{props.number || 0}-{props.children || "Sem children"}</button>
    )
}