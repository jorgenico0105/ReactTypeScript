
export type Guitar = {
    id : number
    name : string
    image : string
    description : string
    price: number
}
export type CarItem= Guitar&{//Herencia de Guitar 
    quantity:number
}
export type GuitarProps={
    guitar : Guitar,
    addToCar:(item:Guitar)=>void
}
//Utility Types 
export type GuitarID= Guitar['id']//Creamos un nuevo tipo con los utility types esta escoge solo lo que queremos 

