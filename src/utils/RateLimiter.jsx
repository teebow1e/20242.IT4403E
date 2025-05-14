class RateLimiter {
    constructor(maxRequests = 5, timeWindow = 60000) { // Max 5 form sending / 60 sec
        this.requests = new Map();
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
    }

    isRateLimited(clientId) {
        const now = Date.now();
        const clientRequests = this.requests.get(clientId) || [];
        
        const validRequests = clientRequests.filter(timestamp => 
            now - timestamp < this.timeWindow
        );

        if (validRequests.length >= this.maxRequests) {
            return true;
        }

        validRequests.push(now);
        this.requests.set(clientId, validRequests);
        return false;
    }

    getRemainingRequests(clientId) {
        const clientRequests = this.requests.get(clientId) || [];
        const validRequests = clientRequests.filter(timestamp => 
            Date.now() - timestamp < this.timeWindow
        );
        return this.maxRequests - validRequests.length;
    }
}

export const rateLimiter = new RateLimiter();