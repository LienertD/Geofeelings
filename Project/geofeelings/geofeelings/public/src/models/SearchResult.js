function SearchResult(title, photoUrl, description, id)
{
    this.title = title;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
}
SearchResult.prototype.toString = function() {
    return this.title;
}; 
