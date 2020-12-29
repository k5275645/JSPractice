const {
    Worker,
    isMainThread,
    parentPort,
    workerData
} = require('worker_threads');

if (isMainThread) { // 메인쓰레드
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: {
            start: 1
        },
    }));
    threads.add(new Worker(__filename, {
        workerData: {
            start: 2
        },
    }));

    for (let worker of threads) {
        worker.on('message', (value) => console.log('워커로부터', value));
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.log('워커 끝');
            }
        });
    }


    //worker.postMessage('ping');

} else { // 워커쓰레드
    const data = workerData;
    parentPort.postMessage(data.start + 100);

    // parentPort.on('message', (value) => {
    //     console.log('부모로부터', value);
    //     parentPort.postMessage('pong');
    //     parentPort.close();
    // });
}