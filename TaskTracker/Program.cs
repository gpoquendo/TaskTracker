var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles(new DefaultFilesOptions
{
    DefaultFileNames = new List<string> { "index.html" }
});

app.UseStaticFiles();

//app.MapGet("/", () => "Hello World!");

app.Run();
