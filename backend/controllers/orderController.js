import Order from "../models/orderModel.js";
import Product from '../models/productModel.js'

//utility Fun
function calcPrice(orderItems){
    const itemsPrice = orderItems.reduce((a, i) => a + i.price * i.qty, 0)
    const shippingPrice = itemsPrice > 10000 ? 0 : 10;
    const taxRate = 0.15
    const taxPrice = (itemsPrice * taxRate).toFixed(2);
    const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2);

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
    }

    function formatPrice(value) {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });
    return formatter.format(value);
}

    
}

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrice(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id username')
        res.json(orders);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getUserOrder = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})
        res.json(orders);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const totalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        res.json({totalOrders});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const totalSales = async (req, res) => {
    try {
        const orders = await Order.find()
        const sales = orders.reduce((s, o) => s + o.totalPrice, 0);
        res.json({sales})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const totalSalesByDate = async (req, res) => {
    try {
        const sales = await Order.aggregate([
            {
                $match: {isPaid: true,},
            },
            {
                $group: {_id:{
                    $dateToString: {format: '%Y-%m-%d', date: '$isPaidAt'}
                },
                totalSales: {$sum: "$totalPrice"}
            }
            }
        ])
        res.json(sales)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const findById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'username email')
        if(order){
            res.json(order)
        }
        else{
            res.status(404)
            throw new Error("Order Not Found!")
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const markOrderAsPay = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(order){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            }
            const updateOrder = await order.save();
            res.status(200).json(updateOrder)
        }else{
            res.status(404);
            throw new Error("Order Not Found! Or Not Paid!")
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const markOrderAsDeliver = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(order){
            order.isDelivered = true;
            order.deliverdAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }else{
            res.status(404);
            throw new Error("Order Not Found! Or Not Paid!")
        }
    } catch (error) {
       res.status(500).json({error: error.message}) 
    }
}

export {createOrder, getAllOrders, getUserOrder, totalOrders, totalSales, totalSalesByDate, findById, markOrderAsPay, markOrderAsDeliver};
