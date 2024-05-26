using DataLayer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

string connection = "Host=localhost;Port=5432;Database=test_task;Username=postgres;Password=wfikbu347FS";
// Add services to the container.
builder.Services.AddDbContext<DBContext>(options => options.UseNpgsql(connection));
builder.Services.AddScoped<IDBService, DBService>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("/index.html");

app.Run();
