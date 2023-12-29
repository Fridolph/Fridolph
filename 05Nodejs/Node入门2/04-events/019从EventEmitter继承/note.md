> 这个技术展示了如何创建一个基于EventEmitter的自定义类。在理解这个技术的原理后，我们将学习到如何使用EventEmitter，以及如何更好地使用基于它的模块。

问题：
希望通过事件驱动的手段来解决问题。 有一个类，我们希望在异步事件发生时来操作它。

> 理解事件驱动是非常重要的。    事件是解决那些本质是异步问题的最好典范：来自人类的输入。    我们将用一个音乐播放器作为例子来展示EventEmitter是如何工作的。
> 它不会真正播放音乐，但是它的基本概念是理解如何使用事件的好方法。

解决方案： 
从Node中使用是很ijian2d典型例子是从EventEmitter继承。可以通过一个简单的原型类实现，只要记得在类的构造函数中调用EventEmitter的构造函数。


监听器也能被删除，emitter.removeListener可以将一个监听器从一个指定的事件上删除。
emitter.removeAllListeners可以删除全部的监听器。 需要将一个监听器保存在一个变量中，
使它在被删除时能被引用到，就像通过clearTimeout来删除timers一样。



util.inherits通过封装ES5的Object.create方法来实现。它通过从一个原型到另外一个原型继承属性的方式来实现。
Node中还将父类的构造函数保存在super_属性中。这使得调用父类构造函数变得简单许多。
在使用util.inherits之后，你的原型类可以通过YourClass.super_调用EventEmitter。

你也可以仅对一个事件反应一次，而不是每次它触发时都反应。通过once方法来绑定监听器就能实现。这在一个事件虽然会触发多次，但我们只关心它第一次触发的时候非常有用。

例： 可以通过更新例3来追踪播放器的播放事件是否已经触发了：
muscicPlayer.once('play', {
  this.audioFirstStarted = new Date();
});

当从EventEmitter继承时，记得要在构造函数中通过events.EventEmitter.call(this)来调用EventEmitter的构造函数。


### 总结

我们所学的这几个方法：
on
emit
removeListener
removeAllListeners