using MineGame;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();
builder.Services.AddRouting();
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5100); // Replace with your desired port
});
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//                      policy =>
//                      {
//                          policy.AllowAnyOrigin()
//                                .AllowAnyMethod()
//                                .AllowAnyHeader()
//                                .AllowCredentials();
//                      });
//});
var app = builder.Build();
app.UseRouting();



app.UseEndpoints(
    endpoints => endpoints.MapHub<Game>("/Game"));

//app.UseCors();

app.UseStaticFiles();

app.MapGet("/",  context =>
{
    return context.Response.SendFileAsync("wwwroot/welcome.html");
});

app.Run();
