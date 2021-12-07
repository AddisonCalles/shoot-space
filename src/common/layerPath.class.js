export class LayerPath {
    #color;
    #path;
    #element;
    #originalPath;
    #rotation = 0;

    constructor(path_, color_, element) {
        this.#color = color_;
        this.#path = path_;
        this.#originalPath = path_;
        this.#element = element;
    }

    rotate(direction) {
        const rotatePath = new Path2D();
        rotatePath.addPath(this.#originalPath, DOMMatrix.fromMatrix().translate(this.#element.width / 2, this.#element.height / 2).rotate(direction).translate(this.#element.width / 2 * -1, this.#element.height / 2 * -1));
        this.#path = new Path2D();
        this.#path.addPath(rotatePath, DOMMatrix.fromMatrix().translate(this.#element.x, this.#element.y));
    }

    render() {
        const rotation = this.#rotation+this.#element.rotation + (this.#element.enabledVectorRotation? this.#element.vector.dir:0);
        this.rotate(rotation);
        this.#element.context.fillStyle = this.#color;
        this.#element.context.fill(this.#path);

    }

    get rotation(){ this.#rotation; }
    set rotation(value){this.#rotation = value};
    get color() { return this.#color; }
    get path() { return this.#path; }

}