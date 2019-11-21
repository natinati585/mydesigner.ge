// class EventsManager {
//     topics = {};
//
//     listen(topic, listener) {
//         if (!Array.isArray(topic)) topic = [topic];
//
//         topic.forEach((c) => {
//             if (!this.topics[c])
//                 this.topics[c] = [listener];
//             else
//                 this.topics[c].push(listener);
//         })
//     }
//
//
//     fire(topic, data) {
//         // return if the topic doesn't exist, or there are no listeners
//         if (!this.topics[topic] || this.topics[topic].length < 1) return;
//
//         // send the event to all listeners
//         this.topics[topic].forEach(function (listener) {
//             listener(data);
//         });
//     }
// }
//
// export default new EventsManager();