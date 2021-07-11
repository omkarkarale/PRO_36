var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed, FedTime, time;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  FedTime = database.ref('FeedTime');

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedFood=createButton("Feed Food");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  FedTime.on("value", function(data){
    time = data.val();
  })
 
  //write code to display text lastFed time here
  textSize(15);
  fill("black");
  if(time>0 && time < 12){
    text("Last Feed : " + time + " AM", 350, 30);
  }
  else if(time===0){
    text("Last Feed : 12 AM", 350, 30);
  }
  else if(time===12){
    text("Last Feed : 12 PM", 350, 30);
  }
  else if(time===13){
    text("Last Feed : 1 PM", 350, 30);
  }
  else if(time===14){
    text("Last Feed : 2 PM", 350, 30);
  }
  else if(time===15){
    text("Last Feed : 3 PM", 350, 30);
  }
  else if(time===16){
    text("Last Feed : 4 PM", 350, 30);
  }
  else if(time===17){
    text("Last Feed : 5 PM", 350, 30);
  }
  else if(time===18){
    text("Last Feed : 6 PM", 350, 30);
  }
  else if(time===19){
    text("Last Feed : 7 PM", 350, 30);
  }
  else if(time===20){
    text("Last Feed : 8 PM", 350, 30);
  }
  else if(time===21){
    text("Last Feed : 9 PM", 350, 30);
  }
  else if(time===22){
    text("Last Feed : 10 PM", 350, 30);
  }
  else if(time===23){
    text("Last Feed : 11 PM", 350, 30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
   var food_stock_val = foodObj.getFoodStock();
    if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val * 0);
    }else{
      foodObj.updateFoodStock(food_stock_val - 1);
      database.ref('/').update({
       Food:foodS - 1
      });
    }
    print(hour());
    lastFed = hour();
    database.ref('/').update({
      FeedTime : lastFed
    })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
