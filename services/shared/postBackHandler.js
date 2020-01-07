class PostBackHandler {
    constructor() {
        this.events = new Map();
    }

    on(action, callback) {
        this.events.set(action, callback);
    }

    off(action) {
        this.events.delete(action);
    }

    async handle(ctx) {
        if (!ctx.request.body || !ctx.request.body.action) {
            ctx.throw('Bad Request, request body must follow schema { action, payload }.');
        }
    
        let { action, payload } = ctx.request.body;
        let callback = this.events.get(action);
        if (callback) {
            return await callback(payload);
        } else {
            ctx.throw(`Action <${action}> not registered.`);
        }
    }
}

module.exports = PostBackHandler;