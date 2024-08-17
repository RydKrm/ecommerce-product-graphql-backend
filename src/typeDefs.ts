import { readFileSync } from 'fs';
import path from 'path';
const typeDefs = [
    readFileSync(path.resolve('./src/product/product.schema.graphql'), { encoding: 'utf-8' }),
]

export default typeDefs;