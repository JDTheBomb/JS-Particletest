let canvas = document.createElement('canvas');
canvas.height = screen.height
canvas.width = screen.width

Object.assignProperties(canvas,{
    ctx : canvas.getContext("2d"),
    Grid : new ImageData(canvas.width,canvas.height),
    get width(){
        return this.Grid.width;
    },
    set width(w){
        this.setAttribute('width', w);
        this.Grid = this.ctx.createImageData(w,this.height);
    },
    get pdw(){ //Pixel _ width
        return this.Grid.width*4;
    },
    get height(){
        return this.Grid.height;
    },
    set height(h){
        this.setAttribute('height', h);
        this.Grid = this.ctx.createImageData(this.width,h);
    },
    clearPixel(pixel){
        this.Grid.data[pixel] = 0
        this.Grid.data[pixel+1] = 0
        this.Grid.data[pixel+3] = 0
    },
    randomPixel(){
        let h = ~~(Math.random() * this.Grid.height);
        let w = ~~(Math.random() * this.Grid.width);
        return (h*this.pdw)+(w*4);
    },
    addMaterials : {
        sand(pixel){
            this.Grid.data[pixel] = 255
            this.Grid.data[pixel+1] = 255
            this.Grid.data[pixel+3] = 255
        }
    },
    start(){
        console.log("Starting Loop");
        this.interval = setInterval(() => this.main(), 1);
    },
    main(){
        //console.log("Main Started");
        //performance.mark('start');
        for(let h=this.Grid.height;0<=h;h--){
            let ch = h*this.pdw;
            for(let w=this.Grid.width;0<=w;w--){
                let pixel = ch+(w*4);
                let lowerPixel = pixel+this.pdw
                let leftPixel = pixel-4
                let lowerLeftPixel = leftPixel+this.pdw
                let rightPixel = pixel+4
                let lowerRightPixel = rightPixel+this.pdw+4
                if(h<this.Grid.height-1){
                    /*
                    switch(new Uint8ClampedArray(this.Grid.data.buffer, pixel, pixel+3)){
                        case [255,255,0,0]:
                    }*/
                    if(this.Grid.data[pixel]==255 && this.Grid.data[pixel+1]==255){
                        /*
                        switch(){
                            case :
                                break;
                        }*/
                        if(!this.Grid.data[lowerPixel] && !this.Grid.data[lowerPixel+1] && !this.Grid.data[lowerPixel+2]){
                            this.clearPixel(pixel);
                            this.addMaterials.sand(pixel);
                        } else if(!this.Grid.data[leftPixel] && !this.Grid.data[leftPixel+1] && !this.Grid.data[leftPixel+2]){
                            if(!this.Grid.data[lowerLeftPixel] && !this.Grid.data[lowerLeftPixel+1] && !this.Grid.data[lowerLeftPixel+2]){
                                this.clearPixel(pixel);
                                this.addMaterials.sand(lowerPixel);
                            }
                        }else if(!this.Grid.data[rightPixel] && !this.Grid.data[rightPixel+1] && !this.Grid.data[rightPixel+2]){
                            if(!this.Grid.data[lowerRightPixel] && !this.Grid.data[lowerRightPixel+1] && !this.Grid.data[lowerRightPixel+2]){
                                this.clearPixel(pixel);
                                this.addMaterials.sand(lowerRightPixel);
                            }
                        }
                    }
                }
            }
        }
        this.ctx.putImageData(this.Grid,0,0)
        //this.ctx.putImageData(this.Grid,0,0);
        // End the performance measurement
        //performance.mark('end');

        // Measure the time between the start and end marks
        //performance.measure('benchmark', 'start', 'end');

        // Get the duration of the benchmark
        //const duration = performance.getEntriesByName('benchmark')[0].duration;

        //console.log(`Benchmark duration: ${duration} milliseconds`);
        //console.log("Finished Loop");
    },
    stop(){
        console.log("Loop Stopping");
        //Reset Variables here//

        clearInterval(this.interval);
        console.log("Loop Stopped");
    }
})
for(let i=0;i<80000;i++){
    let pixel = canvas.randomPixel()
    while(canvas.Grid.data[pixel]==255){
        pixel = canvas.randomPixel()
    }
    canvas.Grid.data[pixel]=255
    canvas.Grid.data[pixel+1]=255
    canvas.Grid.data[pixel+3]=255
};
canvas.ctx.putImageData(canvas.Grid,0,0)
//canvas.start();
document.body.insertBefore(canvas, document.body.childNodes[0]);
bruh = m =>{console.log(m)}
//canvas.width = screen.width;
//canvas.height = screen.height;
//canvas.start();
/*
canvas.grid = new Proxy(new Uint8ClampedArray(canvas.width*canvas.height*5), {
    get: function(target, property, receiver) {
        console.log(target)
        console.log(propery)
        console.log(receiver)
        if (property === "length") {
            console.log("Custom getter for length");
            return Reflect.get(target, property, receiver);
        } else {
            console.log(`Custom getter for property ${property}`);
            return target[property];
        }
    },
    set: function(target, property, value, receiver) {
      console.log(`Custom setter for property ${property}`);
      return Reflect.set(target, property, value, receiver);
    }
});

Object.defineProperty(canvas, "grid", {
    set: function(newValue) {
        console.log("bitch")
        //putImageData(new ImageData.data = (this.grid.data.filter(function(_, index) {return (index + 1) % 5 !== 0;}),0,0), 0, 0)
        
    }
  });
*/