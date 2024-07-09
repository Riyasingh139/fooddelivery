const MealTypeModel = require("../model/mealtype");
const RestaurantModel = require("../model/mealitem");
const restro =require("../model/Restruo")

module.exports.getRestro = async (req, res) => {
  let { loc_id } = req.params;
  let result = await restro.find(
    { location_id: loc_id },
    {
      name: 1,
      city: 1,
      locality: 1,
      image: 1,
    }
  );
  res.send({
    status: true,
    message: "Successfully get all restros",
    result,
  });
};
module.exports.getRestaurantById = async (request, response) => {
  let { id } = request.params;
  let result = await restro.findById(id);
  response.send({
    status: true,
    result,
  });
};
module.exports.getMealTypeList = async (request, response) => {
  let result = await MealTypeModel.find();
  response.send({
    status: true,
    result,
  });
};

module.exports.getMenuItemsByRestaurantId = async (request, response) => {
  let { r_id } = request.params;
  let result = await RestaurantModel.find({ restaurantId: r_id });
  response.send({
    status: true,
    result,
  });
};


module.exports.filter = async (request, response) => {
  let { location, meal_type, sort, cuisine_id ,page,lcost,hcost} = request.body;
  let filter = {};
  let limit=2;
  const start=(page-1)*limit;
  const end=(page)*limit;
  
  sort = sort === undefined ? 1 : sort;
  page= page === undefined ? 1 : page;


  if (location !== undefined) filter["location_id"] = location;
  if (meal_type !== undefined) filter["mealtype_id"] = meal_type;
  if (cuisine_id !== undefined) filter["cuisine_id"] = { $in: cuisine_id };
  if( lcost && hcost)
  {
      // filters['mealtype_id']=mealtype;
      filter['min_price'] ={$lte :hcost , $gte :lcost}
      

  }
  

  let result = await restro.find(filter, {
    name: 1,
    city: 1,
    locality: 1,
    image: 1,
    mealtype_id: 1,
    cuisine: 1,
    min_price: 1,
  }).sort({
    min_price: sort,
  }).limit(limit).skip(start);
  response.send({
    status: true,
    result,
  });
};
