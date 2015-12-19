function SearchResult(id,username)
{
    this.id = id;
    this.username = username;
}
SearchResult.prototype.toString = function() {
    return this.title;
};
