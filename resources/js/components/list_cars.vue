<template>
    <div id="todo-list" class="container">
        <div class="row">
            <div class="col md-6 mx-auto">
                <h1 class="text-center">
                    Listagem de Carros
                </h1>
                <form v-on:submit.prevent="addCar">
                    <label for="modelo_input">Modelo: </label>
                    <input type="text" v-model="modelo" id="modelo_input" class="form-control" placeholder="Adicione um Modelo" required/>
                    <br/>

                    <label for="marca_input">Marca: </label>
                    <input type="text" v-model="marca" id="marca_input" class="form-control" placeholder="Adicione um Marca" required/>
                    <br/>

                    <label for="ano_input">Ano: </label>
                    <input type="number" v-model="ano" id="ano_input" class="form-control" placeholder="Adicione um Ano" required/>
                    <br/>
                    <button type="submit" v-if="this.isEdit == false" class="btn btn-success btn-block mt-3">Adicionar</button>
                    <button type="button" v-else v-on:click="updateCar()" class="btn btn-primary btn-block mt-3">Update</button>
                </form>
                <p/>

                <table class="table">
                    <tr>
                        <td>Modelo</td>
                        <td>Marca</td>
                        <td>Ano</td>
                        <td colspan="2">Ações</td>
                    </tr>
                    <tr v-for="(car) in cars" v-bind:key="car.id" v-bind:modelo="car.modelo">
                        <td class="text-center">{{car.modelo}}</td>
                        <td class="text-center">{{car.marca}}</td>
                        <td class="text-center">{{car.ano}}</td>
                        <td class="text-right">
                            <button type="button" v-on:click="editCar(car.modelo, car.marca, car.ano, car.id)" class="btn btn-info">Update</button>
                            <button type="button" v-on:click="deleteCar(car.id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            cars: [],
            id: '',
            modelo: '',
            marca: '',
            ano: '',
            isEdit: false,
        }
    },

    mounted() {
        this.getCars()
    },

    methods: {
        getCars() {
            axios({method: 'GET', url: '/api/cars'}).then(
                result => {
                    console.log(result.data)
                    this.cars = result.data
                },
                error => {
                    console.error(error)    
                },
            )
            this.modelo = '',
            this.marca  = '',
            this.ano    = '',
            this.isEdit = false
        },
        addCar() {
            axios.post('/api/cars', {
                    modelo: this.modelo, 
                    marca:  this.marca, 
                    ano:    this.ano
            }).then(res => {
                this.getCars()
                console.log(res)
            })
            .catch(er => {
                console.log(err)
            })
        },
        editCar(modelo, marca, ano, id) {
            this.modelo = modelo
            this.marca  = marca
            this.ano    = ano
            this.id     = id
            this.isEdit = true
        },
        updateCar() {
            console.log(this.id)
            axios.put(`/api/cars/${this.id}`, {
                modelo: this.modelo, 
                marca:  this.marca, 
                ano:    this.ano
            }).then(res => {
                this.getCars()
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteCar(id) {
            axios.delete(`/api/cars/${this.id}`)
            .then(res => {
                this.getCars()
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
}
</script>
