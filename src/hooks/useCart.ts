import { useEffect,useState,useMemo } from "react"
import {db} from '../data/db'
import { Guitar,CarItem,GuitarID} from "../types"

export const useCart=()=>{
    const initialCart=():CarItem[]=>{
        const localStorageCart=localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
      
      const [data]=useState(db)
      const [cart,setCart]=useState(initialCart)
    
      useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))//cada que cambie cart ejecuta una funcion 
      },[cart])
      //para consumir apis use effect 
      //Funcion para agregar a un carrito
      const addToCar=(item:Guitar)=>{
        const isAddTo=cart.findIndex(guitar=>guitar.id===item.id)//verificamos que si en nuestro nuevo arreglo cart ya hay ese id 
        console.log(isAddTo)
        if (isAddTo>=0){
          console.log('Ya esta agreado')
          const updateCart=[...cart]
          updateCart[isAddTo].quantity++//El metodo findIndex te devuelve la poscion de un elemento cuando lo buscas, por lo que te da la posicion y ya tienes para mejor control con posiciones
          setCart(updateCart)
        }else{
          const newItem :CarItem={...item,quantity:1}
          setCart(prevCart=>[...prevCart,newItem])//set cart ya sabe que hace referenica a cart
          console.log('Agregando')
        }
        
      }
      const removeElement = (id:GuitarID) => {
        console.log(`Eliminando ${id}`);
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
      };
      const increCart=(id:GuitarID)=>{
        console.log(`Incrementando ${id}`)
        const updatedCart= cart.map(item => {
          if (item.id === id && item.quantity<5){
            return{
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item//si no se cumple la condicion pues devuelvo el mismo elemento 
        })
        setCart(updatedCart)
      }
      const decreseCart=(id:GuitarID)=>{
        console.log(`Quitando elemtnos ${id}`)
        const updateCart=cart.map(item=>{
          if (item.id==id && item.quantity>0){
            if (item.quantity==0){
              removeElement(item.id)
            }else {
              return{
                ...item,
                quantity: item.quantity - 1,
              }
            }
          }
          return item
        })
        setCart(updateCart)
      }
      function clearCart (){
        setCart([])
      }
      const isEmpty =useMemo(()=>cart.length===0,[cart])
      const carTotal=useMemo(()=>cart.reduce((total,item)=>total+(item.quantity*item.price),0),[cart])
    return{
        data,
        cart,
        addToCar,
        removeElement,
        increCart,
        decreseCart,
        clearCart,
        isEmpty,
        carTotal
    }
}
