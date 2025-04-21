/**
 * This JSON array is used to store all the words for the App.
 */
const ALL_WORDS =
	[
		{
			"category": "Number",
			"cname": "数字",
			"words": [
				{ "chinese": "一", "english": "One", "pinyin": "Yī", "phrase": ["一个", "一对", "一心一意"], "sentence": "你拍一，我拍一，一个小孩开飞机。", "image": "images/chars/Number/number-1.png" },
				{ "chinese": "二", "english": "Two", "pinyin": "Ér", "phrase": ["二人", "二斤", "合二为一"], "sentence": "你拍二，我拍二，两个小孩梳小辫儿。", "image": "images/chars/Number/number-2.png" },
				{ "chinese": "三", "english": "Three", "pinyin": "Sān", "phrase": ["三只", "三天", "三心二意"], "sentence": "你拍三，我拍三，三个小孩吃饼干。", "image": "images/chars/Number/number-3.png" },
				{ "chinese": "四", "english": "Four", "pinyin": "Sì", "phrase": ["四把", "四个月", "四平八稳"], "sentence": "你拍四，我拍四，四个小孩写大字。", "image": "images/chars/Number/number-4.png" },
				{ "chinese": "五", "english": "Five", "pinyin": "Wǔ", "phrase": ["五辆", "五台", "五谷丰登"], "sentence": "你拍五，我拍五，五个小孩烤白薯。", "image": "images/chars/Number/number-5.png" },
				{ "chinese": "六", "english": "Six", "pinyin": "Liù", "phrase": ["六条", "六周", "六六大顺"], "sentence": "你拍六，我拍六，六个小孩烧牛肉。", "image": "images/chars/Number/number-6.png" },
				{ "chinese": "七", "english": "Seven", "pinyin": "Qī", "phrase": ["七匹", "七头", "七上八下"], "sentence": "你拍七，我拍七，七个小孩穿新衣。", "image": "images/chars/Number/number-7.png" },
				{ "chinese": "八", "english": "Eight", "pinyin": "Bā", "phrase": ["八张", "八回", "四面八方"], "sentence": "你拍八，我拍八，八个小孩吹喇叭。", "image": "images/chars/Number/number-8.png" },
				{ "chinese": "九", "english": "Nine", "pinyin": "Jiǔ", "phrase": ["九块", "九磅", " 八九不离十"], "sentence": "你拍九，我拍九，九个小孩看杨柳。", "image": "images/chars/Number/number-9.png" },
				{ "chinese": "十", "english": "Ten", "pinyin": "Shí", "phrase": ["十双", "十章", "十拿九稳"], "sentence": "你拍十，我拍十，十个小孩不挑食。", "image": "images/chars/Number/number-10.png" },
				{ "chinese": "百", "english": "Hundred", "pinyin": "Bǎi", "phrase": ["三百", "百姓", "百发百中"], "sentence": "十个十就是一百。", "image": "images/chars/Number/number-100.png" },
				{ "chinese": "零", "english": "Zero", "pinyin": "Líng", "phrase": ["零钱", "零碎", "七零八碎"], "sentence": "计数，我们从零开始。", "image": "images/chars/Number/number-0.png" },
				{ "chinese": "数", "english": "Number", "pinyin": "Shù", "phrase": ["一二三四五", "数字", "数不胜数"], "sentence": "六七八九十", "image": "images/chars/Number/number.png" }
			]
		},
		{
			"category": "Color",
			"cname": "颜色",
			"words": [
				{ "chinese": "红", "english": "Red", "pinyin": "Hóng", "phrase": ["红色", "红豆", "万紫千红，"], "sentence": "天上飘着一个红气球。", "image": "images/chars/Color/red.png" },
				{ "chinese": "橙", "english": "Orange", "pinyin": "Chéng", "phrase": ["橙色", "橙子", " 橙黄桔绿"], "sentence": "街上开过来一辆橙色的汽车。", "image": "images/chars/Color/orange.png" },
				{ "chinese": "黄", "english": "Yellow", "pinyin": "Huáng", "phrase": ["黄色", "蛋黄", "黄梁一梦"], "sentence": "屋里有一扇黄色的大门。", "image": "images/chars/Color/yellow.png" },
				{ "chinese": "绿", "english": "Green", "pinyin": "Lǜ", "phrase": ["绿色", "绿叶", "绿水青山"], "sentence": "在绿色的草地上，小姑娘正玩得高兴。", "image": "images/chars/Color/green.png" },
				{ "chinese": "青", "english": "Cayan", "pinyin": "Qīng", "phrase": ["青色", "青年", "青出于蓝"], "sentence": "一个青色的大球浮在空中。", "image": "images/chars/Color/cyan.png" },
				{ "chinese": "蓝", "english": "Blue", "pinyin": "Lán", "phrase": ["蓝色", "蓝天", "青出于蓝"], "sentence": "一辆深蓝色的火车开进站来。", "image": "images/chars/Color/blue.png" },
				{ "chinese": "紫", "english": "Purple", "pinyin": "Zǐ", "phrase": ["紫色", "紫红", "紫气东来"], "sentence": "那个紫色的冰棍为什么飘在空中？", "image": "images/chars/Color/purple.png" },
				{ "chinese": "粉", "english": "Pink", "pinyin": "Fěn", "phrase": ["粉色", "花粉", "粉墨登场"], "sentence": "那边有一大堆粉色的气球。", "image": "images/chars/Color/pink.png" },
				{ "chinese": "黑", "english": "Black", "pinyin": "Hēi", "phrase": ["黑色", "黑天", "黑白分明"], "sentence": "桌上有一支特别大的黑蜡笔。", "image": "images/chars/Color/black.png" },
				{ "chinese": "白", "english": "White", "pinyin": "Bái", "phrase": ["白色", "白天", "一青二白"], "sentence": "一大团白纸升在了空中。", "image": "images/chars/Color/white.png" },
				{ "chinese": "灰", "english": "Gray", "pinyin": "Huī", "phrase": ["灰色", "灰尘", "灰头土脸"], "sentence": "一个小女孩和一幢灰色的房子。", "image": "images/chars/Color/gray.png" },
				{ "chinese": "虹", "english": "Rainbow", "pinyin": "Hóng", "phrase": ["彩虹", "气贯长虹"], "sentence": "雨后，天上有一道彩虹。", "image": "images/chars/Color/rainbow.png" }
			]
		},
		{
			"category": "Shape",
			"cname": "形状",
			"words": [
				{ "chinese": "点", "english": "Point", "pinyin": "Diǎn", "phrase": ["一点", "点头", " 蜻蜓点水", ""], "sentence": "纸上画了四个黑点。", "image": "images/chars/Shape/point.jpg" },
				{ "chinese": "线", "english": "Line", "pinyin": "Xiàn", "phrase": ["红线", "线条", "引线穿针"], "sentence": "那是三条棕色的直线。", "image": "images/chars/Shape/lines.jpg" },
				{ "chinese": "边", "english": "Side", "pinyin": "Biān", "phrase": ["五边形", "边界", "一望无边"], "sentence": "那是个棕色的五边形。", "image": "images/chars/Shape/pentagon.jpg" },
				{ "chinese": "角", "english": "Angle", "pinyin": "Jiǎo", "phrase": ["三角形", "角度", "转弯抹角"], "sentence": "图中有三个三角形。", "image": "images/chars/Shape/triangle.jpg" },
				{ "chinese": "园", "english": "Circle", "pinyin": "Yuán", "phrase": ["圆形", "圆脸", "自圆其说"], "sentence": "你可以看见一个紫色的圆形。", "image": "images/chars/Shape/circle.jpg" },
				{ "chinese": "方", "english": "Square", "pinyin": "Fāng", "phrase": ["方形", "方块", "四面八方"], "sentence": "地上放着两个方块。", "image": "images/chars/Shape/square.jpg" },
				{ "chinese": "矩", "english": "Rectangle", "pinyin": "Jǔ", "phrase": ["矩形", "规矩", "循规蹈矩"], "sentence": "墙上靠着两块矩形的木板。", "image": "images/chars/Shape/rectangle.jpg" },
				{ "chinese": "星", "english": "Star", "pinyin": "Xīng", "phrase": ["星形", "星星", "月明星稀"], "sentence": "那里有三颗星星。", "image": "images/chars/Shape/star.jpg" },
				{ "chinese": "花", "english": "Flower", "pinyin": "Huā", "phrase": ["花形", "花边", "鸟语花香"], "sentence": "我看到了两朵粉色的花。", "image": "images/chars/Shape/flower.jpg" }
			]
		},
		{
			"category": "Family",
			"cname": "家庭",
			"words": [
				{ "chinese": "爸", "english": "Father", "pinyin": "Bà", "phrase": ["爸爸"], "sentence": "爸爸的爸爸叫爷爷，爸爸的妈妈叫奶奶。", "image": "images/chars/Family/dad.jpg" },
				{ "chinese": "妈", "english": "Mother", "pinyin": "Mā", "phrase": ["妈妈"], "sentence": "妈妈的爸爸叫外公，妈妈的妈妈叫外婆。", "image": "images/chars/Family/mother.jpg" },
				{ "chinese": "爷", "english": "Grandpa", "pinyin": "Yé", "phrase": ["爷爷", "爷们儿"], "sentence": "爸爸的爸爸叫爷爷，爸爸的妈妈叫奶奶。", "image": "images/chars/Family/grandpa-f.jpg" },
				{ "chinese": "奶", "english": "Grandma", "pinyin": "Nǎi", "phrase": ["奶奶", "牛奶"], "sentence": "爸爸的爸爸叫爷爷，爸爸的妈妈叫奶奶。", "image": "images/chars/Family/grandma-f.jpg" },
				{ "chinese": "公", "english": "Grandpa", "pinyin": "Gōng", "phrase": ["外公", "天公"], "sentence": "妈妈的爸爸叫外公，妈妈的妈妈叫外婆。", "image": "images/chars/Family/grandpa-m.jpg" },
				{ "chinese": "婆", "english": "Grandma", "pinyin": "Pó", "phrase": ["外婆", "婆婆"], "sentence": "妈妈的爸爸叫外公，妈妈的妈妈叫外婆。", "image": "images/chars/Family/grandma-m.webp" },
				{ "chinese": "姐", "english": "Sister", "pinyin": "Jiě", "phrase": ["姐姐", "姐妹"], "sentence": "我是姐姐，我的弟弟叫胡文思。", "image": "images/chars/Family/elder-sister.jpg" },
				{ "chinese": "弟", "english": "Brother", "pinyin": "Dì", "phrase": ["弟弟", "兄弟"], "sentence": "我是弟弟，我的姐姐叫胡清。", "image": "images/chars/Family/younger-brother.jpg" },
				{ "chinese": "哥", "english": "Brother", "pinyin": "Gē", "phrase": ["哥哥", "哥们"], "sentence": "我没有哥哥，因为我是老大。", "image": "images/chars/Family/elder-brother.webp" },
				{ "chinese": "妹", "english": "Sister", "pinyin": "Mèi", "phrase": ["妹妹", "姐妹"], "sentence": "我没有妹妹，但我有个弟弟。", "image": "images/chars/Family/younger-sister.webp" }
			]
		},
		{
			"category": "Body",
			"cname": "身体",
			"words": [
				{ "chinese": "手", "english": "Hand", "pinyin": "Shǒu", "phrase": ["双手", "手术", "手足之情"], "sentence": "我有一双手。", "image": "images/chars/Body/hand.png" },
				{ "chinese": "脚", "english": "Foot", "pinyin": "Jiǎo", "phrase": ["脚趾", "脚下", "手脚并用"], "sentence": "弟弟有两只大脚。", "image": "images/chars/Body/foot.png" },
				{ "chinese": "头", "english": "Head", "pinyin": "Tóu", "phrase": ["头发", "头疼", "头重脚轻"], "sentence": "他们的头发全湿了。", "image": "images/chars/Body/head.png" },
				{ "chinese": "脸", "english": "Face", "pinyin": "Liǎn", "phrase": ["洗脸", "脸色", "愁眉苦脸"], "sentence": "刷牙、洗脸，然后照照镜子。", "image": "images/chars/Body/face.png" },
				{ "chinese": "眼", "english": "Eye", "pinyin": "Yǎn", "phrase": ["眼睛", "闭眼", "手疾眼快"], "sentence": "她有一双大眼睛。", "image": "images/chars/Body/eye.png" },
				{ "chinese": "嘴", "english": "Mouth", "pinyin": "Zuǐ", "phrase": ["张嘴", "壶嘴", "七嘴八舌"], "sentence": "她张开嘴笑了。", "image": "images/chars/Body/mouth.png" },
				{ "chinese": "舌", "english": "Tongue", "pinyin": "Shé", "phrase": ["舌头", "舌尖", "张口结舌"], "sentence": "天热，小狗把舌头伸了出来。", "image": "images/chars/Body/tongue.png" },
				{ "chinese": "牙", "english": "Teeth", "pinyin": "Yá", "phrase": ["牙齿", "门牙", "虎口拔牙"], "sentence": "他掉了一颗门牙。", "image": "images/chars/Body/teeth.png" },
				{ "chinese": "鼻", "english": "Nose", "pinyin": "Bí", "phrase": ["鼻子", "鼻尖", "嗤之以鼻"], "sentence": "大象有一条很长的鼻子。", "image": "images/chars/Body/nose.png" },
				{ "chinese": "眉", "english": "Eyebrow", "pinyin": "Méi", "phrase": ["眉毛", "眉眼", "扬眉吐气"], "sentence": "她有两条细长的眉毛。", "image": "images/chars/Body/eyebrow.png" },
				{ "chinese": "发", "english": "Hair", "pinyin": "Fā", "phrase": ["头发", "长发", "千钧一发"], "sentence": "我有一头很长的黑发。", "image": "images/chars/Body/hair.png" },
				{ "chinese": "肚", "english": "Du", "pinyin": "Dù", "phrase": ["肚子", "腿肚子", "牵肠挂肚"], "sentence": "一大腕面条，把肚子吃饱了。", "image": "images/chars/Body/abdomen.png" },
				{ "chinese": "臂", "english": "Arm", "pinyin": "Bì", "phrase": ["手臂", "长臂猿"], "sentence": "他很高，手臂很长。", "image": "images/chars/Body/arm.png" },
				{ "chinese": "腿", "english": "Leg", "pinyin": "Tuǐ", "phrase": ["大腿", "桌子腿", "花拳绣腿"], "sentence": "长颈鹿脖子很长，还有四条大长腿。", "image": "images/chars/Body/leg.png" },
				{ "chinese": "屁", "english": "Butt", "pinyin": "Pì", "phrase": ["屁股", "放屁"], "sentence": "他一屁股坐在沙发上。", "image": "images/chars/Body/butt.png" }
			]
		},
		{
			"category": "Nature",
			"cname": "自然",
			"words": [
				{ "chinese": "天", "english": "Sky", "pinyin": "Tiān", "phrase": ["天空", "明天", "天下太平"], "sentence": "今天的天气真好。", "image": "images/chars/Nature/sky.jpg" },
				{ "chinese": "地", "english": "Earth", "pinyin": "Dì", "phrase": ["土地", "地下", "地广人稀"], "sentence": "地上长满了草。", "image": "images/chars/Nature/earth.jpg" },
				{ "chinese": "阳", "english": "Sun", "pinyin": "Yáng", "phrase": ["太阳", "阳光", "阳春白雪"], "sentence": "早上，太阳从东边升起来。", "image": "images/chars/Nature/sun.jpg" },
				{ "chinese": "月", "english": "Moon", "pinyin": " Yuè", "phrase": ["月亮", "一个月", "日月星辰"], "sentence": "每个月有一天晚上，月亮特别圆。", "image": "images/chars/Nature/moon.jpg" },
				{ "chinese": "星", "english": "Star", "pinyin": "Xīng", "phrase": ["星星", "明星", "星罗棋布"], "sentence": "夜里，天上有好多星星。", "image": "images/chars/Nature/star.jpg" },
				{ "chinese": "云", "english": "Cloud", "pinyin": "Yún", "phrase": ["云彩", "白云", "风云变幻"], "sentence": "蓝天上有几朵白云。", "image": "images/chars/Nature/cloud.jpg" },
				{ "chinese": "风", "english": "Wind", "pinyin": "Fēng", "phrase": ["刮风", "风雨", "风调雨顺"], "sentence": "大风把树都吹弯了。", "image": "images/chars/Nature/wind.jpg" },
				{ "chinese": "雨", "english": "Rain", "pinyin": "Yǔ", "phrase": ["下雨", "雨水", "雨过天晴"], "sentence": "外面下着小雨，空气很潮湿。", "image": "images/chars/Nature/rain.jpg" },
				{ "chinese": "雪", "english": "Snow", "pinyin": "Xuě", "phrase": ["雪花", "雪崩", "雪上加霜"], "sentence": "我们在院子里堆了个雪人。", "image": "images/chars/Nature/snow.jpg" },
				{ "chinese": "金", "english": "Metal", "pinyin": "Jīn", "phrase": ["黄金", "金色", "点石成金"], "sentence": "金子是黄色的。", "image": "images/chars/Nature/metal.jpg" },
				{ "chinese": "木", "english": "Wood", "pinyin": "Mù", "phrase": ["木头", "树木", "草木皆兵"], "sentence": "这张桌子是用木头做的的。", "image": "images/chars/Nature/wood.jpg" },
				{ "chinese": "水", "english": "Water", "pinyin": "Shuǐ", "phrase": ["喝水", "水瓶", "山高水远"], "sentence": "刚刚下完雨，到处都是水。", "image": "images/chars/Nature/water.jpg" },
				{ "chinese": "火", "english": "Fire", "pinyin": "Huǒ", "phrase": ["火柴", "火车", "水火不容"], "sentence": "把火点上，咱们开始烤肉了。", "image": "images/chars/Nature/fire.jpg" },
				{ "chinese": "土", "english": "Dirt", "pinyin": "Tǔ", "phrase": ["土地", "尘土", "土生土长"], "sentence": "树下有一大堆土。", "image": "images/chars/Nature/dirt.jpg" }
			]
		},
		{
			"category": "Food",
			"cname": "食物",
			"words": [
				{ "chinese": "米", "english": "Rice", "pinyin": "Mǐ", "phrase": ["米饭", "米粉", "无米之炊"], "sentence": "今天中午吃米饭。", "image": "images/chars/Food/rice.jpg" },
				{ "chinese": "面", "english": "Flour", "pinyin": "Miàn", "phrase": ["面包", "面条", "面红耳赤"], "sentence": "刚刚烤好的面包，很好吃。", "image": "images/chars/Food/flour.jpg" },
				{ "chinese": "糖", "english": "Sugar", "pinyin": "Táng", "phrase": ["白糖", "糖果", "糖衣炮弹"], "sentence": "别吃太多的糖，对牙齿不好。", "image": "images/chars/Food/suger.jpg" },
				{ "chinese": "奶", "english": "Milk", "pinyin": "Nǎi", "phrase": ["牛奶", "豆奶", "奶声奶气"], "sentence": "你每天早上喝牛奶吗？", "image": "images/chars/Food/milk.jpg" },
				{ "chinese": "菜", "english": "Vegetable", "pinyin": "Cài", "phrase": ["蔬菜", "做菜", "面有菜色"], "sentence": "要吃肉，也要吃蔬菜和水果。", "image": "images/chars/Food/vegitable.jpg" },
				{ "chinese": "果", "english": "Fruit", "pinyin": "Guǒ", "phrase": ["水果", "果实", "前因后果"], "sentence": "桌子上摆的水果有苹果，香蕉和葡萄。", "image": "images/chars/Food/fruit.jpg" },
				{ "chinese": "肉", "english": "Meat", "pinyin": "Ròu", "phrase": ["鸡肉", "牛肉", "心惊肉跳"], "sentence": "今天的晚饭有肉，也有菜。", "image": "images/chars/Food/meat.jpg" }
			]
		},
		{
			"category": "Tableware",
			"cname": "餐具",
			"words": [
				{ "chinese": "刀", "english": "Knife", "pinyin": "Dāo", "phrase": ["刀子", "剪刀", "一刀两段"], "sentence": "桌上放着好几把刀。", "image": "images/chars/Tableware/knife.jpg" },
				{ "chinese": "叉", "english": "Fork", "pinyin": "Chā", "phrase": ["叉子", "钢叉", "四仰八叉"], "sentence": "那里有三把叉子。", "image": "images/chars/Tableware/fork.jpg" },
				{ "chinese": "勺", "english": "Spoon", "pinyin": "Sháo", "phrase": ["汤勺", "瓷勺", "一勺烩"], "sentence": "喝汤的时候，要用勺子。", "image": "images/chars/Tableware/spoon.jpg" },
				{ "chinese": "筷", "english": "Chopstick", "pinyin": "Kuài", "phrase": ["筷子", "竹筷"], "sentence": "三双竹筷子和两双木筷子。", "image": "images/chars/Tableware/chopstick.jpg" },
				{ "chinese": "碗", "english": "Bowl", "pinyin": "Wǎn", "phrase": ["饭碗", "大碗", "一碗水端平"], "sentence": "我们家有瓷碗和木碗。", "image": "images/chars/Tableware/bowl.jpg" },
				{ "chinese": "盘", "english": "Plate", "pinyin": "Pán", "phrase": ["盘子", "算盘", "杯盘狼藉"], "sentence": "饭桌上有盘子，还有碗。", "image": "images/chars/Tableware/plate.jpg" },
				{ "chinese": "锅", "english": "Pot", "pinyin": "Guō", "phrase": ["铁锅", "炒菜锅", "一锅端"], "sentence": "晚上我们熬了一锅粥。", "image": "images/chars/Tableware/pot.jpg" },
				{ "chinese": "瓶", "english": "Bottle", "pinyin": "Píng", "phrase": ["瓶子", "水瓶", "守口如瓶"], "sentence": "出去玩的时候，带上两瓶水。", "image": "images/chars/Tableware/bottle.jpg" },
				{ "chinese": "杯", "english": "Glass", "pinyin": "Bēi", "phrase": ["杯子", "酒杯", "杯水车薪"], "sentence": "口渴了吧，先喝杯水。", "image": "images/chars/Tableware/glass.jpg" },
				{ "chinese": "纸", "english": "Napkin", "pinyin": "Zhǐ", "phrase": ["纸巾", "餐巾纸", "白纸黑字"], "sentence": "请递给我一张餐巾纸。", "image": "images/chars/Tableware/napkin.jpg" }
			]
		},
		{
			"category": "Furniture",
			"cname": "家具",
			"words": [
				{ "chinese": "门", "english": "Door", "pinyin": "Mén", "phrase": ["大门", "开门", "门庭若市"], "sentence": "家里有一扇玻璃门。", "image": "images/chars/Furniture/door.jpg" },
				{ "chinese": "窗", "english": "Window", "pinyin": "Chuāng", "phrase": ["窗户", "天窗", "窗明几净"], "sentence": "窗户上挂着窗帘。", "image": "images/chars/Furniture/window.jpg" },
				{ "chinese": "床", "english": "Bed", "pinyin": "Chuáng", "phrase": ["大床", "温床", "同床异梦"], "sentence": "早上起来要把床收拾整齐。", "image": "images/chars/Furniture/bed.jpg" },
				{ "chinese": "桌", "english": "Table", "pinyin": "Zhuō", "phrase": ["饭桌", "书桌", "圆桌会议"], "sentence": "书桌上有一些笔和纸。", "image": "images/chars/Furniture/table.jpg" },
				{ "chinese": "椅", "english": "Chair", "pinyin": "Yǐ", "phrase": ["椅子", "躺椅", "桌椅板凳"], "sentence": "书桌旁边有两把椅子。", "image": "images/chars/Furniture/chair.jpg" },
				{ "chinese": "凳", "english": "Stool", "pinyin": "Dèng", "phrase": ["凳子", "高凳", "坐冷板凳"], "sentence": "厨房里有几个木头凳子。", "image": "images/chars/Furniture/stool.jpg" },
				{ "chinese": "柜", "english": "Cabinet", "pinyin": "Guì", "phrase": ["书柜", "碗柜", "翻箱倒柜"], "sentence": "厨房的碗柜里有好多碗和盘子。", "image": "images/chars/Furniture/cabinet.jpg" },
				{ "chinese": "灯", "english": "Light", "pinyin": "Dēng", "phrase": ["台灯", "路灯", "万家灯火"], "sentence": "桌子上放着一盏台灯。", "image": "images/chars/Furniture/light.jpg" },
				{ "chinese": "画", "english": "Painting", "pinyin": "Huà", "phrase": ["油画", "国画", "画龙点睛"], "sentence": "墙上挂着两幅画。", "image": "images/chars/Furniture/painting.jpg" }
			]
		},
		{
			"category": "Clothes",
			"cname": "衣服",
			"words": [
				{ "chinese": "衣", "english": "Clothes", "pinyin": "Yī", "phrase": ["衣服", "上衣", "丰衣足食"], "sentence": "我把衣服都叠好了。", "image": "images/chars/Clothes/clothes.jpg" },
				{ "chinese": "裤", "english": "Pants", "pinyin": "Kù", "phrase": ["裤子", "长裤", "纨绔子弟"], "sentence": "墙上挂着几条裤子。", "image": "images/chars/Clothes/pants.jpg" },
				{ "chinese": "裙", "english": "Skirt", "pinyin": "Qún", "phrase": ["裙子", "短裙", "裙带关系"], "sentence": "这几条裙子真好看。", "image": "images/chars/Clothes/skirt.jpg" },
				{ "chinese": "帽", "english": "Hat", "pinyin": "Mào", "phrase": ["帽子", "草帽", "乌纱帽"], "sentence": "出去时，要带上草帽。", "image": "images/chars/Clothes/hat.jpg" },
				{ "chinese": "鞋", "english": "Shoe", "pinyin": "Xié", "phrase": ["皮鞋", "凉鞋", "踏破铁鞋"], "sentence": "到夏天了，出门可以穿凉鞋。", "image": "images/chars/Clothes/shoe.jpg" },
				{ "chinese": "袜", "english": "Socks", "pinyin": "Wà", "phrase": ["袜子", "长袜", "青鞋布袜"], "sentence": "我有好几双花袜子。", "image": "images/chars/Clothes/socks.jpg" },
				{ "chinese": "被", "english": "Comforter", "pinyin": "Bèi", "phrase": ["被子", "被动", "一朝被蛇咬"], "sentence": "睡觉时要盖好被子。", "image": "images/chars/Clothes/comforter.jpg" },
				{ "chinese": "毯", "english": "Blanket", "pinyin": "Tǎn", "phrase": ["毯子", "毛毯", "绿茵如毯"], "sentence": "毯子比被子薄一些。", "image": "images/chars/Clothes/blanket.jpg" },
				{ "chinese": "枕", "english": "Pillow", "pinyin": "Zhěn", "phrase": ["枕头", "枕巾", "高枕无忧"], "sentence": "这个粉色的枕头太高了。", "image": "images/chars/Clothes/pillow.jpg" }
			]
		},
		{
			"category": "Toiletry",
			"cname": "洗漱",
			"words": [
				{ "chinese": "盆", "english": "Bath", "pinyin": "Pén", "phrase": ["澡盆", "脸盆", "倾盆大雨"], "sentence": "大澡盆里面有只小鸭子。", "image": "images/chars/Toiletry/bath.jpg" },
				{ "chinese": "巾", "english": "Towel", "pinyin": "Jīn", "phrase": ["毛巾", "浴巾", "巾帼英雄"], "sentence": "洗完澡后，用毛巾把身上擦干。", "image": "images/chars/Toiletry/towel.jpg" },
				{ "chinese": "油", "english": "Cream", "pinyin": "Yóu", "phrase": ["擦脸油", "春雨贵如油"], "sentence": "要经常在手上、脸上擦点油。", "image": "images/chars/Toiletry/cream.jpg" },
				{ "chinese": "梳", "english": "Comb", "pinyin": "Shū", "phrase": ["梳子", "梳头", "梳洗打扮"], "sentence": "吃早饭前，要把头发梳好。", "image": "images/chars/Toiletry/comb.jpg" },
				{ "chinese": "刷", "english": "Brush", "pinyin": "Shuā", "phrase": ["牙刷", "刷子"], "sentence": "起床后，先把牙刷干净。", "image": "images/chars/Toiletry/toothbrush.jpg" },
				{ "chinese": "膏", "english": "Paste", "pinyin": "Gāo", "phrase": ["牙膏", "唇膏"], "sentence": "刷牙时要用牙膏。", "image": "images/chars/Toiletry/toothpaste.jpg" }
			]
		},
		{
			"category": "Stationery",
			"cname": "文具",
			"words": [
				{ "chinese": "书", "english": "Book", "pinyin": "Shū", "phrase": ["读书", "书法", "博览群书"], "sentence": "桌上放着好几本书。", "image": "images/chars/Stationery/book.jpg" },
				{ "chinese": "本", "english": "Notebook", "pinyin": "Běn", "phrase": ["书本", "根本", "本来面目"], "sentence": "你可以在本子上写字。", "image": "images/chars/Stationery/notebook.jpg" },
				{ "chinese": "笔", "english": "Pen", "pinyin": "Bǐ", "phrase": ["铅笔", "钢笔", "生花妙笔"], "sentence": "用笔可以画画，也可以写字。", "image": "images/chars/Stationery/pen.jpg" },
				{ "chinese": "纸", "english": "Paper", "pinyin": "Zhǐ", "phrase": ["白纸", "手纸", "纸上谈兵"], "sentence": "在白纸写字、画画。", "image": "images/chars/Stationery/paper.jpg" },
				{ "chinese": "电", "english": "Electricity", "pinyin": "Diàn", "phrase": ["电脑", "电话", "电视"], "sentence": "电脑很有用。", "image": "images/chars/Stationery/computer.jpg" },
				{ "chinese": "机", "english": "Machine", "pinyin": "Jī", "phrase": ["手机", "机器", "机不可失"], "sentence": "出门要带上手机。", "image": "images/chars/Stationery/smartphone.jpg" }
			]
		},
		{
			"category": "Toy",
			"cname": "玩具",
			"words": [
				{ "chinese": "娃", "english": "Doll", "pinyin": "Wá", "phrase": ["洋娃娃", "小娃娃"], "sentence": "她有好多的洋娃娃。", "image": "images/chars/Toy/Nora.jepg" },
				{ "chinese": "泥", "english": "Doh", "pinyin": "Ní", "phrase": ["橡皮泥", "泥土"], "sentence": "用橡皮泥捏小玩意。", "image": "images/chars/Toy/playdoh.jpg" },
				{ "chinese": "牌", "english": "Card", "pinyin": "Pái", "phrase": ["扑克牌", "纸牌"], "sentence": "我和弟弟玩扑克牌。", "image": "images/chars/Toy/card.jpg" },
				{ "chinese": "木", "english": "Block", "pinyin": "Mù", "phrase": ["积木", "木头", "草木皆兵"], "sentence": "她从小就喜欢搭积木。", "image": "images/chars/Toy/block.jpg" },
				{ "chinese": "乐", "english": "Happy", "pinyin": "Lè", "phrase": ["乐高", "快乐", "安居乐业"], "sentence": "乐高是一种很好玩的玩具。", "image": "images/chars/Toy/lego.jpg" }
			]
		},
		{
			"category": "Animal",
			"cname": "动物",
			"words": [
				{ "chinese": "牛", "english": "Cow", "pinyin": "Niú", "phrase": ["黄牛", "水牛", "九牛一毛"], "sentence": "山坡上，一头牛在吃草。", "image": "images/chars/Mammal/cow.jpg" },
				{ "chinese": "狗", "english": "Dog", "pinyin": "Gǒu", "phrase": ["黄狗", "狗叫", "狗仗人势"], "sentence": "家里有一条大黄狗。", "image": "images/chars/Mammal/dog.jpg" },
				{ "chinese": "虎", "english": "Tiger", "pinyin": "Hǔ", "phrase": ["老虎", "狐假虎威", "猛虎下山"], "sentence": "我爸爸是属老虎的。", "image": "images/chars/Mammal/tiger.jpg" },
				{ "chinese": "兔", "english": "Rabbit", "pinyin": "Tù", "phrase": ["兔子", "白兔", "龟兔赛跑"], "sentence": "我妈妈和弟弟都是属兔的。", "image": "images/chars/Mammal/rabbit.jpg" },
				{ "chinese": "猴", "english": "Monkey", "pinyin": "Hóu", "phrase": ["猴子", "猴精", "猴年马月"], "sentence": "猴子很聪明，也很调皮。", "image": "images/chars/Mammal/monkey.jpg" },
				{ "chinese": "马", "english": "Horse", "pinyin": "Mǎ", "phrase": ["白马", "马车", "马到成功"], "sentence": "马跑得特别快。", "image": "images/chars/Mammal/horse.jpg" },
				{ "chinese": "羊", "english": "Sheep", "pinyin": "Yáng", "phrase": ["山羊", "绵羊", "亡羊补牢"], "sentence": "早晨，他到山上去放羊。", "image": "images/chars/Mammal/sheep.jpg" },
				{ "chinese": "猫", "english": "Cat", "pinyin": "Māo", "phrase": ["花猫", "猫步", "照猫画虎"], "sentence": "我养了一只黑色的猫。", "image": "images/chars/Mammal/cat.jpg" },
				{ "chinese": "鼠", "english": "Mouse", "pinyin": "Shǔ", "phrase": ["老鼠", "田鼠", "胆小如鼠"], "sentence": "我家里没有老鼠。", "image": "images/chars/Mammal/mouse.jpg" },
				{ "chinese": "鹿", "english": "Deer", "pinyin": "Lù", "phrase": ["小鹿", "梅花鹿", "指鹿为马"], "sentence": "有一只鹿在河边喝水。", "image": "images/chars/Mammal/deer.jpg" },
				{ "chinese": "象", "english": "Elephant", "pinyin": "Xiàng", "phrase": ["大象", "象牙", "盲人摸象"], "sentence": "大象和它的孩子在河里玩水。", "image": "images/chars/Mammal/elephant.jpg" },
				{ "chinese": "猪", "english": "Pig", "pinyin": "Zhū", "phrase": ["猪肉", "肥猪", "猪狗不如"], "sentence": "猪很胖，也很懒。", "image": "images/chars/Mammal/pig.jpg" },
				{ "chinese": "狼", "english": "Wolf", "pinyin": "Láng", "phrase": ["灰狼", "狼群", "狼子野心"], "sentence": "一只狼在雪地里跑。", "image": "images/chars/Mammal/wolf.jpg" }
			]
		},
		{
			"category": "Fish",
			"cname": "鱼类",
			"words": [
				{ "chinese": "鱼", "english": "Fish", "pinyin": "Yú", "phrase": ["金鱼", "钓鱼", "如鱼得水"], "sentence": "一条红鲤鱼在河里游。", "image": "images/chars/Fish/fish.jpg" },
				{ "chinese": "虾", "english": "Shrimp", "pinyin": "Xiā", "phrase": ["河虾", "对虾", "虾兵蟹将"], "sentence": "水下有三只青色的虾。", "image": "images/chars/Fish/shrimp.jpg" },
				{ "chinese": "蟹", "english": "Crab", "pinyin": "Xiè", "phrase": ["螃蟹", "海蟹", "河蟹"], "sentence": "螃蟹有八条腿，横着走路。", "image": "images/chars/Fish/crab.jpg" },
				{ "chinese": "龟", "english": "Turtle", "pinyin": "Guī", "phrase": ["乌龟", "海龟", "龟兔赛跑"], "sentence": "河边有两只乌龟。", "image": "images/chars/Fish/turtle.jpg" },
				{ "chinese": "蛙", "english": "Frog", "pinyin": "Wā", "phrase": ["青蛙", "牛蛙", "井底之蛙"], "sentence": "夜晚，池塘里青蛙在叫。", "image": "images/chars/OtherAnimal/frog.jpg" },
				{ "chinese": "鲨", "english": "Shark", "pinyin": "Shā", "phrase": ["鲨鱼", "大白鲨"], "sentence": "鲨鱼很大，非常凶猛。", "image": "images/chars/Fish/shark.jpg" },
				{ "chinese": "鲸", "english": "Whale", "pinyin": "Jīng", "phrase": ["鲸鱼", "蓝鲸", "虎头鲸"], "sentence": "鲸鱼在海里生活，非常大。", "image": "images/chars/Fish/whale.jpg" }
			]
		},
		{
			"category": "Bird",
			"cname": "鸟类",
			"words": [
				{ "chinese": "鸟", "english": "Bird", "pinyin": "Niǎo", "phrase": ["小鸟", "鸟叫", "笨鸟先飞"], "sentence": "树上落着一只小鸟。", "image": "images/chars/Bird/birds.jpg" },
				{ "chinese": "鸡", "english": "Chicken", "pinyin": "Jī", "phrase": ["公鸡", "鸡蛋", "鸡犬升天"], "sentence": "公鸡早上会打鸣。", "image": "images/chars/Bird/roster.jpg" },
				{ "chinese": "鸭", "english": "Duck", "pinyin": "Yā", "phrase": ["鸭子", "鸭蛋", "赶鸭子上架"], "sentence": "鸡、鸭、鹅都是鸟，但都不会飞了。", "image": "images/chars/Bird/duck.jpg" },
				{ "chinese": "鹅", "english": "Goose", "pinyin": "É", "phrase": ["鹅蛋", "烤鹅", "鹅毛大雪"], "sentence": "鸡、鸭、鹅都是鸟，但都不会飞了。", "image": "images/chars/Bird/gooses.jpg" },
				{ "chinese": "鹰", "english": "Eagle", "pinyin": "Yīng", "phrase": ["山鹰", "老鹰", "鹰击长空"], "sentence": "鹰是一种大鸟，飞得很高。", "image": "images/chars/Bird/eagle.jpg" },
				{ "chinese": "燕", "english": "Swallow", "pinyin": "Yàn", "phrase": ["燕子", "雨燕", "莺歌燕舞"], "sentence": "燕子是一种小鸟，飞得很远。", "image": "images/chars/Bird/swallow.jpg" }
			]
		},
		{
			"category": "Insect",
			"cname": "昆虫",
			"words": [
				{ "chinese": "蝶", "english": "Butterfly", "pinyin": "Dié", "phrase": ["蝴蝶", "飞碟", "招蜂引蝶"], "sentence": "蝴蝶有很多种，颜色不一样。", "image": "images/chars/Insect/butterfly.jpg" },
				{ "chinese": "虫", "english": "Bug", "pinyin": "Chóng", "phrase": ["虫子", "瓢虫", "花鸟虫鱼"], "sentence": "瓢虫还有一个名字，叫屎壳郎。", "image": "images/chars/Insect/ladybug.jpg" },
				{ "chinese": "蜂", "english": "Bee", "pinyin": "Fēng", "phrase": ["蜜蜂", "马蜂", "蜂拥而至"], "sentence": "花丛中有好多蜜蜂在采蜜。", "image": "images/chars/Insect/bee.jpg" },
				{ "chinese": "蚊", "english": "Mosquito", "pinyin": "Wén", "phrase": ["蚊虫", "飞蚊", "蚊子腿也是肉"], "sentence": "蚊子一般在晚上出来。", "image": "images/chars/Insect/mosquito.jpg" },
				{ "chinese": "蝇", "english": "Fly", "pinyin": "Yíng", "phrase": ["苍蝇", "果蝇", "蝇头小利"], "sentence": "苍蝇到处落，很脏。", "image": "images/chars/Insect/fly.jpg" }
			]
		},
		{
			"category": "Plant",
			"cname": "植物",
			"words": [
				{ "chinese": "树", "english": "Tree", "pinyin": "Shù", "phrase": ["杨树", "树枝", "树大招风"], "sentence": "路边上有一棵大树。", "image": "images/chars/Plant/tree.webp" },
				{ "chinese": "花", "english": "Flower", "pinyin": "Huā", "phrase": ["红花", "花脸", "花红柳绿"], "sentence": "房子前面有很多花。", "image": "images/chars/Plant/flower.jpg" },
				{ "chinese": "草", "english": "Grass", "pinyin": "Cǎo", "phrase": ["草地", "野草", "草木皆兵"], "sentence": "一条大河从草原上流过。", "image": "images/chars/Plant/grass.jpg" },
				{ "chinese": "菜", "english": "Vegetable", "pinyin": "Cài", "phrase": ["蔬菜", "种菜", "小菜一碟"], "sentence": "菜园里种的有西红柿。", "image": "images/chars/Plant/vegetable.jpg" }
			]
		},
		{
			"category": "Date-Time",
			"cname": "时间",
			"words": [
				{ "chinese": "秒", "english": "Second", "pinyin": "Miǎo", "phrase": ["一秒钟", "秒表", "分秒必争"], "sentence": "一秒钟很短，滴答一声就是一秒。", "image": "images/chars/DateTime/second.gif" },
				{ "chinese": "分", "english": "Minute", "pinyin": "Fēn", "phrase": ["三分钟", "分开", "不分昼夜"], "sentence": "六十秒是一分钟。", "image": "images/chars/DateTime/minute.gif" },
				{ "chinese": "时", "english": "Hour", "pinyin": "Shí", "phrase": ["小时", "时间", "时来运转"], "sentence": "六十分钟是一个小时。", "image": "images/chars/DateTime/hour.gif" },
				{ "chinese": "天", "english": "Day", "pinyin": "Tiān", "phrase": ["每天", "天气", "天高气爽"], "sentence": "每天早上起来，要先涮牙、洗脸。", "image": "images/chars/DateTime/day.gif" },
				{ "chinese": "周", "english": "Week", "pinyin": "Zhōu", "phrase": ["一周", "周围", "细心周到"], "sentence": "一周有七天。", "image": "images/chars/DateTime/week.jpg" },
				{ "chinese": "月", "english": "Month", "pinyin": "Yuè", "phrase": ["月亮", "月饼", "月朗风清"], "sentence": "晚上可以看到天上的月亮。", "image": "images/chars/DateTime/month.gif" },
				{ "chinese": "年", "english": "Year", "pinyin": "Nián", "phrase": ["一年", "过年", "度日如年"], "sentence": "一年有十二个月，三百六十五天。", "image": "images/chars/DateTime/year.gif" },
				{ "chinese": "今", "english": "Today", "pinyin": "Jīn", "phrase": ["今天", "今年", "古今中外"], "sentence": "今天是星期天，大家都休息。", "image": "" },
				{ "chinese": "昨", "english": "Yesterday", "pinyin": "Zuó", "phrase": ["昨天", "昨晚", "昨日黄花"], "sentence": "昨天是星期六。", "image": "" },
				{ "chinese": "明", "english": "Tomorrow", "pinyin": "Míng", "phrase": ["明天", "明年", "明知故问"], "sentence": "明天是星期一。", "image": "" },
				{ "chinese": "现", "english": "Now", "pinyin": "Xiàn", "phrase": ["现在", "现金", "昙花一现"], "sentence": "现在十二点钟。", "image": "images/chars/DateTime/now.png" }
			]
		},
		{
			"category": "Direction",
			"cname": "方向",
			"words": [
				{ "chinese": "上", "english": "Up", "pinyin": "Shàng", "phrase": ["上面", "上个月", "上吐下泻"], "sentence": "哥哥睡在上铺。", "image": "images/chars/Direction/up-down.jpg" },
				{ "chinese": "下", "english": "Down", "pinyin": "Xià", "phrase": ["下面", "下个月", "下不为例"], "sentence": "弟弟睡在下铺。", "image": "images/chars/Direction/up-down.jpg" },
				{ "chinese": "前", "english": "Front", "pinyin": "Qián", "phrase": ["以前", "前方", "前思后想"], "sentence": "以前我不认识字。", "image": "images/chars/Direction/before.png" },
				{ "chinese": "后", "english": "Back", "pinyin": "Hòu", "phrase": ["以后", "后面", "争先恐后"], "sentence": "以后我可以教弟弟认字。", "image": "images/chars/Direction/after.png" },
				{ "chinese": "左", "english": "Left", "pinyin": "Zuǒ", "phrase": ["左手", "左面", "左右开弓"], "sentence": "前面向左转，再走不远就到了。", "image": "images/chars/Direction/left-right.png" },
				{ "chinese": "右", "english": "Right", "pinyin": "Yòu", "phrase": ["右手", "右边", "左右为难"], "sentence": "路的右边是一个电影院。", "image": "images/chars/Direction/left-right.png" }
			]
		},
		{
			"category": "Verb-1",
			"cname": "动词",
			"words": [
				{ "chinese": "走", "english": "Walk", "pinyin": "Zǒu", "phrase": ["走路", "行走", "走南闯北"], "sentence": "她正在向公园走去。", "image": "images/chars/Verb1/walk.png" },
				{ "chinese": "跑", "english": "Run", "pinyin": "Pǎo", "phrase": ["跑步", "逃跑", "东跑西颠"], "sentence": "慢点跑，小心摔跟头。", "image": "images/chars/Verb1/run.png" },
				{ "chinese": "跳", "english": "Jump", "pinyin": "Tiào", "phrase": ["跳高", "跳舞", "心惊肉跳"], "sentence": "她一下跳到沙坑里去了。", "image": "images/chars/Verb1/jump.png" },
				{ "chinese": "看", "english": "See", "pinyin": "Kàn", "phrase": ["看书", "看电视", "刮目相看"], "sentence": "她看见天上有两只小鸟。", "image": "images/chars/Verb1/see.png" },
				{ "chinese": "听", "english": "Listen", "pinyin": "Tīng", "phrase": ["听话", "听音乐", "道听途说"], "sentence": "坐在这听一会音乐。", "image": "images/chars/Verb1/listen.png" },
				{ "chinese": "说", "english": "Say", "pinyin": "Shuō", "phrase": ["说话", "说明", "道听途说"], "sentence": "姐姐在和弟弟说话。", "image": "images/chars/Verb1/say.png" },
				{ "chinese": "唱", "english": "Sing", "pinyin": "Chàng", "phrase": ["唱歌", "唱词", "一唱一和"], "sentence": "在幼儿园里，老师教我们唱歌。", "image": "images/chars/Verb1/sing.png" },
				{ "chinese": "喊", "english": "Shout", "pinyin": "Hǎn", "phrase": ["高喊", "喊叫", "摇旗呐喊"], "sentence": "她有时会大喊大叫。", "image": "images/chars/Verb1/shout.png" },
				{ "chinese": "笑", "english": "Laugh", "pinyin": "Xiào", "phrase": ["微笑", "笑声", "哄堂大笑"], "sentence": "看见巧克力，我高兴地笑了。", "image": "images/chars/Verb1/laugh.png" },
				{ "chinese": "哭", "english": "Cry", "pinyin": "Kū", "phrase": ["大哭", "哭声", "哭天抢地"], "sentence": "她摔了个跟头，坐在地上哭了。", "image": "images/chars/Verb1/cry.png" },
				{ "chinese": "吃", "english": "Eat", "pinyin": "Chī", "phrase": ["吃饭", "口吃", "大吃一惊"], "sentence": "弟弟在学校吃午饭。", "image": "images/chars/Verb1/eat.png" },
				{ "chinese": "喝", "english": "Drink", "pinyin": "Hē", "phrase": ["喝水", "吃喝", "大吃大喝"], "sentence": "渴了吧？喝一杯水。", "image": "images/chars/Verb1/drink.png" },
				{ "chinese": "扔", "english": "Throw", "pinyin": "Rēng", "phrase": ["扔了", "扔东西"], "sentence": "她把球扔得很远。", "image": "images/chars/Verb1/throw.png" },
				{ "chinese": "打", "english": "Beat", "pinyin": "Dǎ", "phrase": ["打开", "打鼓", "打草惊蛇"], "sentence": "她拿了根棍子打地上的树叶子。", "image": "images/chars/Verb1/beat.png" },
				{ "chinese": "翻", "english": "Turn", "pinyin": "Fān", "phrase": ["翻篇", "掀翻", "翻箱倒柜"], "sentence": "在公园的草地上，她翻了个跟头。", "image": "images/chars/Verb1/turn.png" },
				{ "chinese": "躺", "english": "Lie", "pinyin": "Tǎng", "phrase": ["躺下", "平躺", "横躺竖卧"], "sentence": "我躺在床上听妈妈讲故事。", "image": "images/chars/Verb1/lie.png" }
			]
		},
		{
			"category": "Verb-2",
			"cname": "动词",
			"words": [
				{ "chinese": "闻", "english": "Smell", "pinyin": "Wén", "phrase": ["闻味", "新闻", "闻所未闻"], "sentence": "这个冰激凌的香味真好闻。", "image": "images/chars/Verb2/smell.png" },
				{ "chinese": "尝", "english": "Taste", "pinyin": "Cháng", "phrase": ["品尝", "尝鲜", "卧薪尝胆"], "sentence": "你来尝尝这种水果。", "image": "images/chars/Verb2/taste.png" },
				{ "chinese": "摸", "english": "Touch", "pinyin": "Mō", "phrase": ["抚摸", "触摸", "盲人摸象"], "sentence": "小狗喜欢让人拍它，摸它。", "image": "images/chars/Verb2/touch.png" },
				{ "chinese": "推", "english": "Push", "pinyin": "Tuī", "phrase": ["推开", "推门", "推陈出新"], "sentence": "弟弟把椅子推到旁边去。", "image": "images/chars/Verb2/push.png" },
				{ "chinese": "拉", "english": "Pull", "pinyin": "Lā", "phrase": ["拉手", "拉车", "东拉西扯"], "sentence": "弟弟把他的狗拉进屋。", "image": "images/chars/Verb2/pull.png" },
				{ "chinese": "拿", "english": "Take", "pinyin": "Ná", "phrase": ["拿走", "拿过来", "十拿九稳"], "sentence": "他从书架上拿了一本书。", "image": "images/chars/Verb2/take.png" },
				{ "chinese": "玩", "english": "Play", "pinyin": "Wán", "phrase": ["玩游戏", "开玩笑", "游山玩水"], "sentence": "姐姐和弟弟在玩积木。", "image": "images/chars/Verb2/play.png" },
				{ "chinese": "脱", "english": "Take off", "pinyin": "Tuō", "phrase": ["脱衣", "脱离", "脱口而出"], "sentence": "弟弟进屋以后，把外衣脱了下来。", "image": "images/chars/Verb2/takeoff.png" },
				{ "chinese": "端", "english": "Hold", "pinyin": "Duān", "phrase": ["端着", "端正", "变化多端"], "sentence": "我用双手把一个蛋糕端到桌子上去。", "image": "images/chars/Verb2/hold.png" },
				{ "chinese": "敲", "english": "Knock", "pinyin": "Qiāo", "phrase": ["敲门", "推敲", "敲山振虎"], "sentence": "有人敲门，爸爸去看谁来了。", "image": "images/chars/Verb2/knock.png" },
				{ "chinese": "洗", "english": "Wash", "pinyin": "Xǐ", "phrase": ["洗手", "清洗", "碧空如洗"], "sentence": "吃饭前，把手洗干净。", "image": "images/chars/Verb2/wash.png" },
				{ "chinese": "梳", "english": "Comb", "pinyin": "Shū", "phrase": ["梳头", "梳理", "梳洗打扮"], "sentence": "早上起床后，要把头发梳好。", "image": "images/chars/Verb2/comb.png" },
				{ "chinese": "擦", "english": "Wipe", "pinyin": "Cā", "phrase": ["擦洗", "摩擦", "摩拳擦掌"], "sentence": "咱们去把窗户擦干净。", "image": "images/chars/Verb2/wipe.png" },
				{ "chinese": "来", "english": "Come", "pinyin": "Lái", "phrase": ["过来", "起来", "后来居上"], "sentence": "姐姐笑着朝我走过来。", "image": "images/chars/Verb2/come.png" },
				{ "chinese": "去", "english": "Go", "pinyin": "Qù", "phrase": ["回去", "去年", "扬长而去"], "sentence": "她向校车走过去。", "image": "images/chars/Verb2/go.png" },
				{ "chinese": "洒", "english": "Spill", "pinyin": "Sā", "phrase": ["洒水", "泼洒", "挥洒自如"], "sentence": "我把一整瓶水都洒在桌上了。", "image": "images/chars/Verb2/spill.png" },
				{ "chinese": "摔", "english": "Fall", "pinyin": "Shuāi", "phrase": ["摔倒", "摔破", "破罐破摔"], "sentence": "弟弟在草地上摔了一跤。", "image": "images/chars/Verb2/fall.png" }
			]
		},
		{
			"category": "Adjective",
			"cname": "形容词",
			"words": [
				{ "chinese": "大", "english": "Big", "pinyin": "Dà", "phrase": ["大家", "大房子", "大显身手"], "sentence": "篮球比乒乓球大多了。", "image": "images/chars/Adjective/big-small.png" },
				{ "chinese": "小", "english": "Small", "pinyin": "Xiǎo", "phrase": ["小孩", "小人书", "小巧玲珑"], "sentence": "乒乓球比篮球小多了。", "image": "images/chars/Adjective/big-small.png" },
				{ "chinese": "高", "english": "High", "pinyin": "Gāo", "phrase": ["高山", "高兴", "兴高采烈"], "sentence": "这两个大哥哥个子真高。", "image": "images/chars/Adjective/tall-short.png" },
				{ "chinese": "矮", "english": "Short", "pinyin": "Ǎi", "phrase": ["矮个", "矮小", "高矮不一"], "sentence": "这个小弟弟个矮，以后会长高的。", "image": "images/chars/Adjective/tall-short.png" },
				{ "chinese": "长", "english": "Long", "pinyin": "Cháng", "phrase": ["很长", "长江", "取长补短"], "sentence": "她的头发很长。", "image": "images/chars/Adjective/long-short.png" },
				{ "chinese": "短", "english": "Short", "pinyin": "Duǎn", "phrase": ["短袖", "短裤", "问长问短"], "sentence": "她的头发很短。", "image": "images/chars/Adjective/long-short.png" },
				{ "chinese": "脏", "english": "Dirty", "pinyin": "Zàng", "phrase": ["脏东西", "肮脏", "贪脏枉法"], "sentence": "吃完饭，桌上很脏。", "image": "images/chars/Adjective/dirty.png" },
				{ "chinese": "净", "english": "Clean", "pinyin": "Jìng", "phrase": ["干净", "净场", "一干二净"], "sentence": "桌子上很干净，放着一盘沙拉。", "image": "images/chars/Adjective/clean.png" },
				{ "chinese": "香", "english": "Fragrant", "pinyin": "Xiāng", "phrase": ["香花", "香气", "香味扑鼻"], "sentence": "奶奶做的面条真香。", "image": "images/chars/Adjective/fragrant.png" },
				{ "chinese": "臭", "english": "Smelly", "pinyin": "Chòu", "phrase": ["臭味", "臭小子", "臭味相投"], "sentence": "上完厕所把门开着，放放臭味。", "image": "images/chars/Adjective/smelly.png" }
			]
		}
	];

// The greeting images for each category
const GREETING_IMG_DIR = 'images/greetings/';
const GREETING_IMAGES = [
	{
		category: 'All',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Thumbs/two-thumbs-up-icon.png',
		great: ['Thumbs/two-thumbs-up-yellow.jpg', 'Thumbs/two-thumbs-up-purple.jpg', 'Thumbs/two-thumbs-up-pink.jpg']
	},
	{
		category: 'Number',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Thumbs/two-thumbs-up-icon.png',
		great: ['Thumbs/two-thumbs-up-yellow.jpg', 'Thumbs/two-thumbs-up-purple.jpg', 'Thumbs/two-thumbs-up-pink.jpg']
	},
	{
		category: 'Color',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Bluey/Bob.png',
		great: ['Bluey/Bob.png', 'Bluey/Brandy.png', 'Bluey/Calypso.png', 'Bluey/Chloe.png']
	},
	{
		category: 'Shape',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'CocoMelon/CeCe.png',
		great: ['CocoMelon/CeCe.png', 'CocoMelon/Cody.png', 'CocoMelon/Nina.png', 'CocoMelon/Bella.png']
	},
	{
		category: 'Family',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Bluey/Bluey.png',
		great: ['Bluey/Bluey.png', 'Bluey/Bingo.png', 'Bluey/Bandit.png', 'Bluey/Chilli.png']
	},
	{
		category: 'Body',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'CocoMelon/JJ.png',
		great: ['CocoMelon/JJ.png', 'CocoMelon/TomTom.png', 'CocoMelon/YoYo.png']
	},
	{
		category: 'Food',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Animal/cats-icon.png',
		great: ['Animal/cats-1.jpg', 'Animal/cats-2.jpg', 'Animal/cats-3.jpg']
	},
	{
		category: 'Tableware',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Bluey/Coco.png',
		great: ['Bluey/Coco.png', 'Bluey/Frisky.png', 'Bluey/Honey.png', 'Bluey/Indy.png']
	},
	{
		category: 'Furniture',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'CocoMelon/AppBarry.png',
		great: ['CocoMelon/AppBarry.png', 'CocoMelon/Bingo.png', 'CocoMelon/Dad.png', 'CocoMelon/Mom.png']
	},
	{
		category: 'Clothes',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Bluey/Jack.png',
		great: ['Bluey/Jack.png', 'Bluey/Luchy.png', 'Bluey/Machenzie.png', 'Bluey/Missy.png']
	},
	{
		category: 'Toy',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Animal/dogs-icon.png',
		great: ['Animal/dogs-1.jpg', 'Animal/dogs-2.jpg', 'Animal/dogs-3.jpg']
	},
	{
		category: 'Toiletry',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'CocoMelon/Grandma.png',
		great: ['CocoMelon/Grandma.png', 'CocoMelon/Grandpa.png', 'CocoMelon/Nico.png']
	},
	{
		category: 'Stationery',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Disney/Jasmine.png',
		great: ['Disney/Cinderella.png', 'Disney/Jasmine.png', 'Disney/Mulan.png', 'Disney/Snowwhite.png']
	},
	{
		category: 'Verb-1',
		wrong: 'try-again-1.jpg',
		ok: 'talk-okay.jpg',
		icon: 'Bluey/Mort.png',
		great: ['Bluey/Mort.png', 'Bluey/Muffin.png', 'Bluey/Nana.png', 'Bluey/Red.png']
	},
];
