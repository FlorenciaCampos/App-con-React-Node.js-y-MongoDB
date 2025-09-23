import mongoose from "mongoose";

export const statusEnum =["DISPONIBLE","NO DISPONIBLE","DISCONTINUO"]

const productSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: [true,"el nombre es requerido"],
        minLenght: 3,
        maxLenght: 50,
        unique: true,
        trim : true,
        lowercase: true

    },
    price:{
        type: Number,
        required: [true, "el precio es requerido"],
        min:[1,"el campos del precio debe  ser un numero"],//minimo de precio
        
    },
    //precio de ganancia
    profiRate:{
        type: Number,
        default:1.30, //+ 30% del valor de lista
        min: [1,"La tasa de ganancia debe ser mayor o igual a 1"]

    },

    description:{
        type: String,
        minlength: 5,
        maxlength:200
    },

    //El estado lo manejamos con un enum de prosibles valores
    status:{
        type: String,
            validate:{
                validator: function status(status){  //validator es una funcion que permite validar algo del campos
                    return statusEnum.includes (status)
                },
                //props es el dato que no llega del status
                message: props => `${props.value} no es un estado valido`

            }
        },
     //aca va la equivalente a la fk en base de datos NOsql
    category:{ 
        type: mongoose.Schema.Types.ObjectId, ref:"category" 
    },

    stock:{
        type: Number,
        default: 0,
        min: [0,"el stock no puede ser un numero negativo"]
    },
    //campo de producto destacado
    highlighted:{
        type: Boolean,
        default: false,
    }

 
})
//metodos de instancia para disminuir el stock
productSchema.methods.decreaseStock = async function //amount es cantidad "vendida" que se resta al stock
(amount) {
    if(amount <= 0){
        throw new Error("el monto debe ser un numero positivo")

    }
    
    if(this.stock< amount){
        throw  new Error ("No hay suficiente cantidad")
    }
    this.stock -= amount // stock = stock- amount
    //se guarda en la db el  nuevo valor
    await this.save()
}

//atributos/propiedades virtuales. sirven para:
//calcular el precio con la tasa de ganancia
productSchema.virtual("precioConTasaDeGanancia").get(function()
{
    return this.price * this.profiRate
})

productSchema.set("toJSON",{ virtuals:true })
productSchema.set("toObject", { virtuals:true})

export default mongoose.model("product",productSchema)
