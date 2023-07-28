class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        if (this.queryStr.keyword) {
            const keyword = this.queryStr.keyword;
            this.query.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { ingredients: { $regex: keyword, $options: 'i' } },
                    { instructions: { $regex: keyword, $options: 'i' } }
                ]
            });
        }

        return this;
    }


    filter(){
        const queryStrCopy = { ...this.queryStr };
  
        //removing fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach( field => delete queryStrCopy[field]);
        
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr =  queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1)
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;