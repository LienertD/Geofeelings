function SearchResult(title, photoUrl, description, link)
{
    this.title = title;
    this.photoUrl = photoUrl;
    this.description = description;
    this.link = link;
}
SearchResult.prototype.toString = function() {
    return this.title;
};
