// componentes são funções que retornam HTML (JSX), ou seja, 
// pequenos trechos de código que podem ser reutilizados em várias partes da aplicação

// declaração de uma variável, definindo o atributo color e seu valor
const styles = {
    color : 'red',
}

interface ButtonProps { // interface é um tipo de dado, que define a estrutura de um objeto
    title: string; // title é uma propriedade do objeto ButtonProps, do tipo string
}
// declaração de variável tipada, dois pontos após o nome da variável e o seu tipo
// const nome: string = 'Nome' 
export function Button(props: ButtonProps) { // props é um objeto do tipo ButtonProps
    return ( // utilza-se {} ao invés de "" para utilizar variáveis dentro do JSX
        <p style={styles}>
            {props.title}
        </p> 
    )
}