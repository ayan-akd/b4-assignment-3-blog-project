"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                })),
            });
        }
        return this;
    }
    authorFiltering() {
        var _a;
        const author = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.filter;
        if (author) {
            this.modelQuery = this.modelQuery.find({
                author: author,
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = [
            'search',
            'sortBy',
            'sortOrder',
            'limit',
            'page',
            'fields',
            'filter',
        ];
        excludeFields.forEach((el) => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sortBy() {
        var _a, _b;
        const sortBy = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy;
        if (sortBy) {
            const sort = ((_b = sortBy === null || sortBy === void 0 ? void 0 : sortBy.split(',')) === null || _b === void 0 ? void 0 : _b.join(' ')) || 'createdAt';
            this.modelQuery = this.modelQuery.sort(sort);
        }
        return this;
    }
    sortOrder() {
        var _a;
        const sortOrder = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sortOrder;
        if (sortOrder === 'desc') {
            this.modelQuery.sort({ createdAt: -1 });
        }
        else if (sortOrder === 'asc') {
            this.modelQuery.sort({ createdAt: 1 });
        }
        return this;
    }
}
exports.default = QueryBuilder;
