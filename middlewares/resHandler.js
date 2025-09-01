export function responseOk(req,res,next){
    // Guardo el método Json original
     const originalJson = res.json;
     // Sobreescribo el metodo Json
     res.json = function (data){
        // Solo agregar el "ok" : true si el status es exitoso
        if(res.statusCode >= 200 && res.statusCode < 300){
            // Verificar si data es un array
            if (Array.isArray(data)) {
                // Si es un array, mantenerlo como array y no modificarlo
                return originalJson.call(this, data);
            } else {
                // Si no es un array, agregar ok:true
                const response = {ok:true, ...data};
                return originalJson.call(this, response);
            }
        }
        // Si no es exitoso, enviar data original
        return originalJson.call(this, data);
     };

     next();
}