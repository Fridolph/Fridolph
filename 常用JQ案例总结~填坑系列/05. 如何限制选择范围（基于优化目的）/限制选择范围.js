//尽可能使用标签名来作为类名的前缀，     
//这样jQuery就不需要花费更多的时间来搜索     
//你想要的元素。还要记住的一点是，     
//针对于你的页面上的元素的操作越具体化，     
//就越能降低执行和搜索的时间。
 var in_stock = $('#shopping_cart_items input.is_in_stock');
 <ul id="shopping_cart_items"> 
    <li>
        <input type="radio" value="Item-X" name="item" class="is_in_stock" />Item X
    </li> 
    <li>
        <input type="radio" value="Item-Y" name="item" class="3-5_days" />Item Y
    </li> 
    <li>
        <input type="radio" value="Item-Z" name="item" class="unknown" />Item Z
    </li> 
 </ul>