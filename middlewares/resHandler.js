export function responseOk(req,res,next){
    // Guardo el método Json original
     const originalJson = res.json;
     // Sobreescribo el metodo Json
     res.json = function (data){
        // Solo agregar el "ok" : true si el status es exitoso
        if(res.statusCode >= 200 && res.statusCode < 300){
            const response = {ok:true, ...data};
            // Call para invocar el metodo json original
            return originalJson.call(this, response);
        }
        // Si no es exitoso, enviar data original
        return originalJson.call(this, data);
     };

     next();
}