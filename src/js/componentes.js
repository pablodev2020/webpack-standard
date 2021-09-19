import '../css/componentes.css';

export const saludar=(nombre)=>{    // export: indica que puede ser utilizado desde afuera
    console.log('creando la primer etiqueta');
    
    const h1 = document.createElement('h1');
    h1.innerText =`Hola ${nombre} por aca vamos bien, por allá?`;

    document.body.append( h1 );
}