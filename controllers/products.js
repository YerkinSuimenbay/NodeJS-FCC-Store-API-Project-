const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const search = 'ba'

    const products = await Product.find({ 
        name: { $regex: search, $options: 'i' }
    }).sort('name')

    res.status(200).json({ nbHits: products.length, products })
}

const getAllProducts = async (req, res) => {
    const { name, price, featured, rating, company, sort, select, numericFilters } = req.query

    const queryObject = {}

    if (name) queryObject.name = { $regex: name, $options: 'i' }
    if (featured) queryObject.featured = featured
    if (company) queryObject.company = company

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }

        const regEx = /\b(<|<=|=|>|>=)\b/g

        let filters = numericFilters.replace(regEx, match => `-${operatorMap[match]}-`)
        console.log({ numericFilters, filters });
        
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(filter => {
            const [field, operator, value] = filter.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
                'ef'
            }
        })
    }

    const query = Product.find(queryObject)

    // SORT
    if (sort) {
        const sortList = sort.split(',').join(' ')
        query.sort(sortList)
    } else {
        query.sort('createdAt')
    }
    // SELECT
    if (select) {
        const selectList = select.replace(/,/g, ' ')
        query.select(selectList)
    }
    // LIMIT & SKIP i.e. PAGINATION
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    query.skip(skip).limit(limit)   // SAME AS query.limit(limit).skip(skip)

    const products = await query
    res.status(200).json({ nbHits: products.length, products })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}