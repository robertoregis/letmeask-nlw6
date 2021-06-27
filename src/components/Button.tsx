// o próprio React tem uma tipagem para o typescript
import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss'

// o & quer dizer que vai receber mais
// neste caso além de receber o valor HTMLButtonElement
// vai receber elementos que eu criei
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
}


// aqui o Button está recebendo e pegando separadamente o isOutlined
// e os outros na props
export function Button({ isOutlined = false, ...props}: ButtonProps) {
    return (
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props} />
    )
}