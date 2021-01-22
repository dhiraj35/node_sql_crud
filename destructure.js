const person = {
    name :'Dhiraj',
    age : 28,
     test() {  
        console.log('Hi I am'+this.name);  
    },
    test1(){
        console.log("this is test1");
    }  
};  

//Accessing Descture  
const {name,age} = person;
console.log(name,age);

const h1 = person.test();  

const destexample = ["cricket","Chess"];
const [hobbies1,hobbies2] = destexample;


//Accessing Descture 
console.log(hobbies1);    

const prop1 = ({name}) =>{
    console.log(name);    
}

prop1(person);    



