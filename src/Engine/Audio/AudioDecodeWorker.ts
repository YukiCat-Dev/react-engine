const ctx: AudioContext = new AudioContext()

onmessage = async (e) => {
    let port = e.ports[0], msg: AudioBuffer
    if (e.data instanceof Blob) {
        msg = await ctx.decodeAudioData(await e.data.arrayBuffer())
    } else if (e.data instanceof ArrayBuffer) {
        msg = await ctx.decodeAudioData(e.data)
    } else {
        return
    } 
    port.postMessage(msg)
}

