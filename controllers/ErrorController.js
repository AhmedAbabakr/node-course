exports.get404 = (request,response,next) => {
    // response.status(404).send("<h1>Page Not Found</h1>");
    // response.status(404).sendFile(path.join(rootDir,'views','404.html'));
    response.status(404).render('404',{pageTitle:"Not Found"});
}