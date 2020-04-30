import React from 'react';
export default class UIControl extends AbstractUIControl{
    init(parentElement: HTMLElement) {
        throw new Error("Method not implemented.");
    }
    add(element: JSX.Element) {
        throw new Error("Method not implemented.");
    }
    remove(element: JSX.Element) {
        throw new Error("Method not implemented.");
    }

}
export abstract class AbstractUIControl{
    abstract init(parentElement:HTMLElement)
    abstract add(element:any)
    abstract remove(element:any)

}