// Required Package Import
import { Request, Response } from 'express';
import categories from '../model/categories.model';
import Product from '../model/product.model';
import ProductOrder from '../model/product.order.model';
import crypto from 'crypto';


//Main Js Controller;
const productController = {


    async getProductCategory(req: Request, res: Response) {
        try {
            const finalData: Array<any> = await categories.find();
            if (!finalData || finalData.length === 0) {
                return res.status(400).json({
                    status: false,
                    message: 'No Categories List Found',
                });
            } else {
                const data = finalData.map(item => item.list).flat();
                res.status(200).json({
                    status: true,
                    message: 'Data received successfully',
                    data
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getProductCategoryWise(req: Request, res: Response) {
        try {
            const { categories } = req.query as { categories: string };
            console.log(categories);

            if (!categories) {
                res.status(400).json({
                    status: false,
                    message: 'Need Valid Category Id!',
                });
                return;
            }

            const finalData: any = await Product.find(
                { category: categories },
                { _id: 0 }
            );

            if (!finalData || finalData.length === 0) {
                res.status(400).json({
                    status: false,
                    message: 'No Categories List Found',
                });
                return;
            }

            // Send success response
            res.status(200).json({
                status: true,
                message: 'Data received successfully',
                data: finalData
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getProductById(req: Request, res: Response) {
        try {
            const { productId } = req.query as { productId: string };
            console.log(productId);


            if (!productId) {
                res.status(400).json({
                    status: false,
                    message: 'Need Valid productId Id!',
                });
                return;
            }

            const finalData: any = await Product.find(
                { id: productId },
                { _id: 0 }
            );

            if (!finalData || finalData.length === 0) {
                res.status(400).json({
                    status: false,
                    message: 'No product Found',
                });
                return;
            }

            // Send success response
            res.status(200).json({
                status: true,
                message: 'Data received successfully',
                data: finalData
            });
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async placeOrder(req: Request, res: Response) {
        try {
            const data: any = req.body

            if (!data) {
                res.status(400).json({
                    status: false,
                    message: 'Need Valid Order Detail!',
                });
                return;
            }
            const orderId = crypto.randomBytes(4).toString('hex').toUpperCase();

            const newOrder = new ProductOrder({
                orderId: orderId,
                totalItem: data.totalItems,
                totalPrice: data.totalPrice,
                products: data.products
            });

            const savedOrder = await newOrder.save();
            if (savedOrder) {
                res.status(200).json({
                    status: true,
                    message: 'Order Placed successfully'
                });
            }

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getOrderList(req: Request, res: Response) {
        try {

            const finalData: any = await ProductOrder.find();

            if (!finalData || finalData.length === 0) {
                res.status(400).json({
                    status: false,
                    message: 'No ProductOrder List Found',
                });
                return;
            }

            // Send success response
            res.status(200).json({
                status: true,
                message: 'Data received successfully',
                data: finalData
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

};


export default productController;
