function SearchResult(titel, fotoUrl, uitleg, link)
{
    this.titel = titel;
    this.fotoUrl = fotoUrl;
    this.uitleg = uitleg;
    this.link = link;
}
SearchResult.prototype.toString = function() {
    return this.titel;
};
