const fs = require("fs")
let products = []

module.exports = class Contenedor {
    constructor(filePath){
        this.filePath = filePath
        fs.writeFileSync(filePath, "")
    }
    async save(Object){
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8')
            if(!data){
                Object.id = 1
                products.push(Object)
                await fs.promises.writeFile(this.filePath, JSON.stringify(products))
                return Object.id
            }
            else{
                products = JSON.parse(data)
                const lastIndex = products.length - 1
                const lastId = products[lastIndex].id
                Object.id = lastId + 1
                products.push(Object)
                await fs.promises.writeFile(this.filePath, JSON.stringify(products))
                return Object.id
            }
        } catch (error) {
            console.error("Error en save(Object):", error)
        }
    }
    async getAll(){
        try {
            const products = await fs.promises.readFile(this.filePath, "utf-8")
            return JSON.parse(products)
        } catch (error) {
            console.error("Error en getAll():", error)
        }
    }
    async getById(id){
        try {
            const products = await this.getAll()
            const product = products.filter(product => product.id === Number(id)) 
            return product
        } catch (error) {
            console.error(`Error en getById(id): ${error}`)
        }
    }   
    async deleteById(id){
        try {
            const products = await this.getAll()
            const index = products.indexOf(product => product.id === Number(id))
            products.splice(index, 1)
            await fs.promises.writeFile(this.filePath, JSON.stringify(products))
            return console.log(`Producto con id: ${id} eliminado con exito!`)
        } catch (error) {
            console.error(`Error en deleteById(Id): ${error}`)
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.filePath, "")
            return console.log("Todos los productos fueron eliminados exitosamente")
        } catch (error) {
            console.error(`Error en deleteAll(): ${error}`)
        }
    }
}