class AnimalesSlider extends HTMLElement{
    /**
     * Constructor de la clase
     * super Hace referencia al constructor padre
     */
    constructor(){
        super();
        this.positionImg = 0;
    }

    /**
     * Método que retorna el nombre del componente
     */
    static get is(){
        return 'slider-animales';
    }

    /**
     * Función que se invoca por defecto
     * Invocado cuando el elemento se es insertado en el documento, incluyéndose en un árbol shadow
     */
    connectedCallback(){
        this.showSliderTemplate();
    }

    /**
     * Muestra el html por medio de tags
     * Utilizando templates, forma nativa en HTML
     * Polyfill --> template, soporte a navegadores antiguos
     * Este elemento y su contenido no son renderizados en el DOM, pero pueden ser referenciados vía JavaScript
     */
    showSliderTemplate(){
        const plantilla = document.createElement('template');
        plantilla.innerHTML =
        ` 
        <link href="css/style.css" rel="stylesheet">
        <link href="css/bootstrap.css" rel="stylesheet">

        <div class="container slider">
            <div class="row">
                <div class="col">
                    <button id="colAtras"> < </button>
                </div>
                <div class="col">
                    <img id="colImg" src="images/koala.jpg" alt="" />
                </div>
                <div class="col">
                    <button id="colSiguiente"> > </button>
                </div>
            </div>
        </div> 
        `;
        //append: mh jQuery, add contenido html por medio del appendChild
        //appendChild: mh DOM, add un elemento hijo al DOM
        //document.body.appendChild(plantilla); --No sirve

        //shadow DOM, permite add elementos al DOM, 
        //inicia con  shadow root: El nodo raiz del arbol Shadow.

        //Se crea un DOM diferente al principal
        this.attachShadow({mode: 'open'});

        //Se recupera el shadow DOM creado, este es una Propiedad de sólo lectura
        //Clonar el contenido del template creado para no modificar la estructura interna y reutilizarse
        //El contenido que tiene document fragment, es almacenado en memoria, mas no en el mismo DOM y esto ayuda para el rendimiento de la aplicación/web al momento de clonarlo y reutilizarlo.
        this.shadowRoot.appendChild(plantilla.content.cloneNode(true));
        this.generarEventos();
    }

    /**
     * Función que adiciona el evento click a los botones y
     * asigna el valor de la imagen, teniendo en cuenta que 
     * el 1 es siguiente y el 0 es atrás
     */
    generarEventos(){
        //Encontrar un elemento dentro del shadow DOM creado
        let imagen = this.shadowRoot.querySelector('#colImg');
        this.shadowRoot.querySelector('#colSiguiente').addEventListener('click', () =>{
            this.positionImg++;
            imagen.src = this.asignarImg(1);
        });

        this.shadowRoot.querySelector('#colAtras').addEventListener('click', () =>{
            this.positionImg--;
            imagen.src = this.asignarImg(0);
        });
    }
    
    
    /**
     * Función que permite asignar la imagen, teniendo en cuenta que el
     * 1 es siguiente y el 0 es atrás
     * Si > el final de las imgs, vuelve a la primera img
     * Si < en la primera img, vuelve a la última
     * @param {*} accion 
     */
    asignarImg(accion){
        let images = ['koala.jpg', 'ardilla.jpg', 'mapache.png', 
        'leon.png', 'puercoEspin.png', 'zorro.jpg', 'buho.jpg'];
        if((this.positionImg == images.length) && (accion == 1)){
            this.positionImg = 0;
        } 
        if((this.positionImg == -1) && (accion == 0)){
            this.positionImg = images.length-1;
        }
        return `images/${images[this.positionImg]}`; 
    }
    
}

//Se define un nuevo elemento personalizado
//(nombre de componente, clase a la que pertenece)
window.customElements.define(AnimalesSlider.is, AnimalesSlider);
