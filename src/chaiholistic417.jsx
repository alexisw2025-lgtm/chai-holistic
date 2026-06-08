import React, { useState, useEffect, useRef } from "react";
import TeaLibrary from "./TeaLibrary";
import PrayerSection from "./PrayerSection";
import WellnessProfileModal from "./WellnessProfileModal";
import MocktailsPage from "./MocktailsPage";
import SupplementsPage from "./SupplementsPage";
import AncestralTeas from "./AncestralTeas";
import JellyPage from "./JellyPage";
import SeaMossPage from "./SeaMossPage";
import imgSre1 from "./rings/scre1.jpg";
import imgScre2 from "./rings/scre2.jpg";
import imgScre3 from "./rings/scre3.jpg";
import imgSre4 from "./rings/sre4.jpg";
import imgSre5 from "./rings/sre5.jpg";
import imgSre6 from "./rings/sre6.jpg";
import imgSre7 from "./rings/sre7.jpg";

// --- DATA -------------------------------------------------------------------
const BLENDS = [
  { id:"m1", photo:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Morning Rise", occasion:"Morning", tagline:"Greet the day with intention", desc:"Tulsi, ginger & lemon peel awaken your senses and spark clarity for the day ahead.", ingredients:["Tulsi (Holy Basil)","Ginger Root","Lemon Peel","Black Pepper"], price:17.99, benefit:"Energize · Focus · Uplift", color:"#5C7A3E", steepMin:5, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Full Rolling Boil -- pour immediately", mood:"Foggy · Unmotivated", oz:2, cupsPerOz:12, servingSize:"1 tsp", energy:"high", time:"morning", feeling:"foggy", caffeine:false },
  { id:"m2", photo:"/herbs/2am-reset.jpg", name:"2AM Reset", occasion:"Morning", tagline:"For restless nights & racing minds", desc:"Cinnamon, cardamom, ginger & cloves -- a warming blend to soothe and restore after a hard night.", ingredients:["Ceylon Cinnamon","Cardamom","Ginger Root","Cloves"], price:18.99, benefit:"Calm · Restore · Ground", color:"#4A3728", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Anxious · Restless", oz:2, cupsPerOz:10, servingSize:"1 heaping tsp", energy:"low", time:"night", feeling:"anxious", caffeine:false },
  { id:"m3", photo:"/herbs/cinnamon-cloves.jpg", name:"Cinnamon & Cloves", occasion:"Morning", tagline:"Warm spice, ancient remedy", desc:"A bold, comforting classic. Ceylon cinnamon and cloves work together for circulation and warmth.", ingredients:["Ceylon Cinnamon","Organic Cloves"], price:15.99, benefit:"Warmth · Circulation · Comfort", color:"#8B3A2A", steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Cold · Sluggish", oz:2, cupsPerOz:14, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"tired", caffeine:false },
  { id:"m4", photo:"https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Ginger Lemon Sunrise", occasion:"Morning", tagline:"A sharp, bright awakening", desc:"Fresh ginger and lemon peel cut through morning fog with a clean, invigorating brightness.", ingredients:["Ginger Root","Lemon Peel","Lemongrass","Peppermint"], price:16.99, benefit:"Clarity · Digestion · Wake", color:"#C47A1A", steepMin:6, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Full Rolling Boil -- pour immediately", mood:"Tired · Heavy", oz:2, cupsPerOz:13, servingSize:"1 tsp", energy:"high", time:"morning", feeling:"tired", caffeine:false },
  { id:"m5", photo:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Tulsi Awakening", occasion:"Morning", tagline:"The sacred herb, every morning", desc:"Pure tulsi with a touch of cardamom. Adaptogenic, grounding, and deeply clarifying.", ingredients:["Tulsi (Holy Basil)","Cardamom","Cinnamon","Fennel Seed"], price:17.99, benefit:"Adapt · Balance · Focus", color:"#3A6B3A", steepMin:5, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Scattered · Overwhelmed", oz:2, cupsPerOz:12, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"stressed", caffeine:false },
  { id:"m6", photo:"/herbs/black-pepper-chai.jpg", name:"Black Pepper Chai", occasion:"Morning", tagline:"Bold. Warming. Alive.", desc:"A fiery chai blend with black pepper, ginger, and cloves to fire up metabolism and circulation.", ingredients:["Black Pepper","Ginger Root","Cloves","Cinnamon","Cardamom"], price:18.99, benefit:"Metabolism · Heat · Drive", color:"#2A2A2A", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Full Rolling Boil -- pour immediately", mood:"Low energy · Cold", oz:2, cupsPerOz:11, servingSize:"1 tsp", energy:"high", time:"morning", feeling:"tired", caffeine:false },
  { id:"m7", photo:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Lemongrass Lift", occasion:"Morning", tagline:"Light, citrusy, alive", desc:"Lemongrass and mint create a clean, refreshing start to your morning ritual.", ingredients:["Lemongrass","Peppermint","Lemon Peel","Ginger"], price:15.99, benefit:"Refresh · Mood · Digestion", color:"#7A9E3A", steepMin:5, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Dull · Unmotivated", oz:2, cupsPerOz:14, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"foggy", caffeine:false },
  { id:"m8", photo:"/herbs/ashwagandha-morning.jpg", name:"Ashwagandha Morning", occasion:"Morning", tagline:"Strength from the root up", desc:"Ashwagandha root with cinnamon and ginger for a grounded, resilient start to your day.", ingredients:["Ashwagandha Root","Cinnamon","Ginger","Cardamom"], price:20.99, benefit:"Strength · Hormones · Resilience", color:"#6B4A2A", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Depleted · Stressed", oz:2, cupsPerOz:10, servingSize:"11/2 tsp", energy:"medium", time:"morning", feeling:"stressed", caffeine:false },
  { id:"e1", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Chamomile & Calm", occasion:"Evening", tagline:"Slow down. Breathe. Be still.", desc:"Chamomile flowers, lavender & passionflower in a deeply soothing evening blend.", ingredients:["Chamomile","Lavender","Passionflower","Lemon Balm"], price:16.99, benefit:"Peace · Rest · Unwind", color:"#7A6E3A", steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat -- steam rising, not boiling", mood:"Wired · Anxious", oz:2, cupsPerOz:12, servingSize:"1 tsp", energy:"low", time:"evening", feeling:"anxious", caffeine:false },
  { id:"e2", photo:"/herbs/sleepy-spice.jpg", name:"Sleepy Spice", occasion:"Evening", tagline:"Drift off, warmly", desc:"Cinnamon, nutmeg, and valerian root ease you from evening into deep, restful sleep.", ingredients:["Cinnamon","Nutmeg","Valerian Root","Chamomile"], price:18.99, benefit:"Deep Sleep · Relaxation", color:"#3A2A5A", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat -- steam rising, not boiling", mood:"Cannot sleep · Racing mind", oz:2, cupsPerOz:11, servingSize:"1 tsp", energy:"low", time:"night", feeling:"restless", caffeine:false, warning:"Contains Valerian Root. Not recommended during pregnancy. May cause drowsiness -- do not drive after use." },
  { id:"e3", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Lemon Balm Dreams", occasion:"Evening", tagline:"Gentle calm before sleep", desc:"Lemon balm and passionflower quiet anxiety and prepare your nervous system for rest.", ingredients:["Lemon Balm","Passionflower","Chamomile","Lavender"], price:16.99, benefit:"Anxiety · Calm · Sleep", color:"#4A6A3A", steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat -- steam rising, not boiling", mood:"Anxious · Wound up", oz:2, cupsPerOz:13, servingSize:"1 tsp", energy:"low", time:"evening", feeling:"anxious", caffeine:false },
  { id:"e4", photo:"https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Rose & Hibiscus", occasion:"Evening", tagline:"Floral, tart & deeply nourishing", desc:"Rose petals & hibiscus flowers rich in antioxidants with a vibrant ruby brew.", ingredients:["Rose Petals","Hibiscus Flower","Rosehip","Lemon Peel"], price:17.99, benefit:"Beauty · Antioxidant · Heart", color:"#8B2A4A", steepMin:6, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Tense · Need beauty", oz:2, cupsPerOz:13, servingSize:"1 tsp", energy:"medium", time:"evening", feeling:"tense", caffeine:false },
  { id:"e5", photo:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Valerian Rest", occasion:"Evening", tagline:"The deep sleep protocol", desc:"Valerian root with hops and passionflower -- a powerful, natural sleep support blend.", ingredients:["Valerian Root","Hops","Passionflower","Skullcap"], price:19.99, benefit:"Deep Sleep · Anxiety · Calm", color:"#2A2A4A", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat -- steam rising, not boiling", mood:"Insomnia · Restless", oz:2, cupsPerOz:10, servingSize:"1 tsp", energy:"low", time:"night", feeling:"restless", caffeine:false, warning:"Contains Valerian Root & Hops. Not for use during pregnancy or breastfeeding. Do not drive after use. Not for children." },
  { id:"e6", photo:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Lavender Moon", occasion:"Evening", tagline:"Soften into the night", desc:"Lavender, rose, and chamomile combine to soften tension and welcome a peaceful evening.", ingredients:["Lavender","Rose Petals","Chamomile","Oat Straw"], price:17.99, benefit:"Tension · Peace · Gentle", color:"#6A4A7A", steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat -- steam rising, not boiling", mood:"Tense · Hard day", oz:2, cupsPerOz:12, servingSize:"1 tsp", energy:"low", time:"evening", feeling:"tense", caffeine:false },
  { id:"e7", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Peppermint Night", occasion:"Evening", tagline:"Digest, release, sleep", desc:"Peppermint and fennel ease digestion after dinner while gently preparing the body for sleep.", ingredients:["Peppermint","Fennel Seed","Chamomile","Licorice Root"], price:15.99, benefit:"Digestion · IBS · Evening", color:"#2A6A4A", steepMin:6, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Bloated · Uncomfortable", oz:2, cupsPerOz:14, servingSize:"1 tsp", energy:"low", time:"evening", feeling:"uncomfortable", caffeine:false },
  { id:"e8", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Skullcap Serenity", occasion:"Evening", tagline:"Quiet the chatter", desc:"Skullcap and oat straw are the nervous system's best friends -- for days when your mind won't stop.", ingredients:["Skullcap","Oat Straw","Lemon Balm","Chamomile"], price:18.99, benefit:"Nervous System · Quiet Mind", color:"#3A4A6A", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat -- steam rising, not boiling", mood:"Overthinking · Anxious", oz:2, cupsPerOz:11, servingSize:"1 tsp", energy:"low", time:"night", feeling:"anxious", caffeine:false, warning:"Contains Skullcap. Consult your doctor if taking sedative medications or if pregnant." },
  { id:"s1", photo:"/herbs/turmeric-tonic.jpg", name:"Turmeric Tonic", occasion:"Seasonal", tagline:"Golden medicine in every cup", desc:"Turmeric, black pepper & ashwagandha -- the ultimate anti-inflammatory powerhouse blend.", ingredients:["Turmeric Root","Black Pepper","Ashwagandha","Ginger"], price:20.99, benefit:"Immunity · Inflammation · Strength", color:"#C47A1A", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Inflammation · Joints", oz:2, cupsPerOz:10, servingSize:"11/2 tsp", energy:"medium", time:"morning", feeling:"achy", caffeine:false },
  { id:"s2", photo:"https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Elderberry Shield", occasion:"Seasonal", tagline:"Your immune armor", desc:"Elderberry, echinacea and ginger build your immune defenses when you need them most.", ingredients:["Elderberry","Echinacea","Ginger Root","Rose Hips"], price:21.99, benefit:"Immune · Antiviral · Protect", color:"#4A2A6A", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Full Rolling Boil -- pour immediately", mood:"Getting sick · Low immunity", oz:2, cupsPerOz:10, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"sick", caffeine:false },
  { id:"s3", photo:"/herbs/autumn-harvest.jpg", name:"Autumn Harvest", occasion:"Seasonal", tagline:"Warm as the falling leaves", desc:"Apple, cinnamon, cloves and cardamom -- a cozy seasonal blend for cool weather comfort.", ingredients:["Cinnamon","Cloves","Cardamom","Apple Peel","Star Anise"], price:17.99, benefit:"Comfort · Warmth · Seasonal Joy", color:"#8B5A2A", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Full Rolling Boil -- pour immediately", mood:"Cold · Need comfort", oz:2, cupsPerOz:12, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"tired", caffeine:false },
  { id:"s4", photo:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Spring Cleanse", occasion:"Seasonal", tagline:"Bloom from the inside out", desc:"Nettle, cleavers and dandelion welcome spring by gently clearing winter's accumulation.", ingredients:["Nettle Leaf","Cleavers","Dandelion Leaf","Peppermint"], price:18.99, benefit:"Cleanse · Renew · Spring", color:"#4A7A3A", steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Heavy · Need renewal", oz:2, cupsPerOz:12, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"foggy", caffeine:false },
  { id:"s5", photo:"/herbs/winter-warmth.jpg", name:"Winter Warmth", occasion:"Seasonal", tagline:"A hug in a cup", desc:"Ginger, cinnamon, and star anise create deep warmth from the inside out on cold days.", ingredients:["Ginger Root","Cinnamon","Star Anise","Cloves","Orange Peel"], price:17.99, benefit:"Warmth · Circulation · Comfort", color:"#8B3A1A", steepMin:9, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Full Rolling Boil -- pour immediately", mood:"Cold · Chilly · Dark", oz:2, cupsPerOz:11, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"tired", caffeine:false },
  { id:"s6", photo:"https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Summer Hibiscus", occasion:"Seasonal", tagline:"Bright, tart, alive", desc:"Hibiscus and rose hip iced or hot -- a summer vitamin C powerhouse.", ingredients:["Hibiscus Flower","Rose Hip","Lemon Peel","Mint"], price:16.99, benefit:"Vitamin C · Cooling · Bright", color:"#C42A4A", steepMin:5, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Hot · Need refresh", oz:2, cupsPerOz:14, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"tired", caffeine:false },
  { id:"s7", photo:"/herbs/adaptogen-blend.jpg", name:"Adaptogen Blend", occasion:"Seasonal", tagline:"Strengthen your foundation", desc:"Ashwagandha, reishi, and holy basil for long-term resilience through every season.", ingredients:["Ashwagandha Root","Reishi Mushroom","Tulsi","Eleuthero"], price:24.99, benefit:"Adapt · Resilience · Long-term", color:"#3A2A1A", steepMin:12, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Burnout · Chronic stress", oz:2, cupsPerOz:9, servingSize:"11/2 tsp", energy:"medium", time:"morning", feeling:"stressed", caffeine:false, warning:"Contains Ashwagandha & Eleuthero (Siberian Ginseng). Not for use during pregnancy. Consult your doctor if on thyroid or immunosuppressant medications." },
  { id:"w1", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Digestive Peace", occasion:"Wellness", tagline:"Settle, soothe, restore", desc:"Fennel, ginger and peppermint calm the digestive system after meals or during discomfort.", ingredients:["Fennel Seed","Ginger Root","Peppermint","Licorice Root"], price:15.99, benefit:"Digestion · IBS · Bloating", color:"#3A7A5A", steepMin:6, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Bloated · Cramping", oz:2, cupsPerOz:14, servingSize:"1 tsp", energy:"low", time:"anytime", feeling:"uncomfortable", caffeine:false },
  { id:"w2", photo:"https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Heart's Ease", occasion:"Wellness", tagline:"For the tender days", desc:"Hawthorn berry, rose and lemon balm support the heart -- emotionally and physically.", ingredients:["Hawthorn Berry","Rose Petals","Lemon Balm","Motherwort"], price:18.99, benefit:"Heart · Grief · Emotion", color:"#8B2A3A", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Grief · Heartache · Tender", oz:2, cupsPerOz:11, servingSize:"1 tsp", energy:"low", time:"anytime", feeling:"sad", caffeine:false, warning:"Contains Motherwort. NOT for use during pregnancy. Consult your doctor if on heart medications or blood thinners." },
  { id:"w3", photo:"/herbs/brain-boost.jpg", name:"Brain Boost", occasion:"Wellness", tagline:"Think clearly, remember deeply", desc:"Ginkgo, rosemary and lion's mane mushroom sharpen focus and support memory.", ingredients:["Ginkgo Biloba","Rosemary","Lion's Mane","Peppermint"], price:22.99, benefit:"Focus · Memory · Clarity", color:"#2A4A6A", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Brain fog · Forgetful", oz:2, cupsPerOz:10, servingSize:"1 tsp", energy:"high", time:"morning", feeling:"foggy", caffeine:false },
  { id:"w4", photo:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Hormone Harmony", occasion:"Wellness", tagline:"Balance from within", desc:"Vitex, red clover and ashwagandha gently support hormonal balance through the cycle.", ingredients:["Vitex Berry","Red Clover","Ashwagandha","Dong Quai"], price:21.99, benefit:"Hormones · PMS · Balance", color:"#7A3A6A", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"PMS · Hormonal · Imbalanced", oz:2, cupsPerOz:10, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"stressed", caffeine:false, warning:"NOT for use during pregnancy or breastfeeding. Contains Vitex & Dong Quai. May interact with hormonal medications or birth control. Consult your doctor." },
  { id:"w5", photo:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Bone & Joint", occasion:"Wellness", tagline:"Move with ease", desc:"Nettle, oat straw and horsetail nourish bones and connective tissue from the inside.", ingredients:["Nettle Leaf","Oat Straw","Horsetail","Alfalfa"], price:17.99, benefit:"Bones · Joints · Minerals", color:"#4A6A2A", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Stiff · Achy · Joint pain", oz:2, cupsPerOz:11, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"achy", caffeine:false },
  { id:"w6", photo:"https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600", name:"Skin Glow", occasion:"Wellness", tagline:"Beauty brewed from within", desc:"Burdock root, red clover and rose work from the inside to clear and illuminate skin.", ingredients:["Burdock Root","Red Clover","Rose Petals","Calendula"], price:19.99, benefit:"Skin · Acne · Glow", color:"#C48A3A", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Dull skin · Breakouts", oz:2, cupsPerOz:11, servingSize:"1 tsp", energy:"medium", time:"morning", feeling:"tired", caffeine:false },
  { id:"w7", photo:"/herbs/stress-less.jpg", name:"Stress Less", occasion:"Wellness", tagline:"Breathe. Release. Continue.", desc:"Ashwagandha, holy basil and passionflower form a powerful stress-busting adaptogenic trio.", ingredients:["Ashwagandha Root","Tulsi","Passionflower","Lemon Balm"], price:20.99, benefit:"Stress · Cortisol · Calm", color:"#3A5A3A", steepMin:9, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Overwhelmed · Cortisol high", oz:2, cupsPerOz:10, servingSize:"1 tsp", energy:"low", time:"anytime", feeling:"stressed", caffeine:false },
];

const CLEANSING = [
  { id:"c1", name:"Liver & Love", organ:"Liver", tagline:"Your body's filter deserves care", desc:"Dandelion root, milk thistle & turmeric to gently cleanse and support liver function.", ingredients:["Dandelion Root","Milk Thistle","Turmeric","Burdock Root"], price:19.99, benefit:"Liver · Detox · Restore", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Sluggish · Heavy", oz:2, cupsPerOz:10, servingSize:"1 tsp", protocol:"1 cup every morning before eating for 14 days.", days:14, warning:"Not recommended during pregnancy. Consult your doctor if you have gallstones or bile duct obstruction." },
  { id:"c2", name:"Kidney Flush", organ:"Kidney", tagline:"Clear the channels, flow freely", desc:"Nettle, corn silk & juniper berry to support kidney health and healthy fluid balance.", ingredients:["Nettle Leaf","Corn Silk","Juniper Berry","Parsley Root"], price:19.99, benefit:"Kidney · Flush · Renew", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Puffy · Fluid retention", oz:2, cupsPerOz:11, servingSize:"1 tsp", protocol:"2 cups daily for 7 days. Increase water intake.", days:7 },
  { id:"c3", name:"Deep Liver Cleanse", organ:"Liver", tagline:"The full liver reset", desc:"A powerful combination of milk thistle, yellow dock and dandelion for deep liver support.", ingredients:["Milk Thistle","Yellow Dock","Dandelion Root","Artichoke Leaf"], price:21.99, benefit:"Deep Detox · Liver · Bile", steepMin:12, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Toxic feeling · Skin issues", oz:2, cupsPerOz:9, servingSize:"11/2 tsp", protocol:"1 cup morning and 1 cup evening for 21 days.", days:21, warning:"Not for use during pregnancy or active liver disease without medical supervision. Contains Yellow Dock -- do not use if taking blood thinners." },
  { id:"c4", name:"Kidney Stone Support", organ:"Kidney", tagline:"Dissolve, flush, heal", desc:"Hydrangea root, gravel root and corn silk work to support the kidneys and urinary tract.", ingredients:["Hydrangea Root","Gravel Root","Corn Silk","Marshmallow Root"], price:22.99, benefit:"Kidney Stones · Urinary · Flush", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Kidney discomfort", oz:2, cupsPerOz:10, servingSize:"1 tsp", protocol:"3 cups daily with high water intake for 30 days.", days:30, warning:"Not for use during pregnancy or kidney disease. Must increase water intake significantly. Consult your doctor before use." },
  { id:"c5", name:"Lymph Mover", organ:"Lymphatic", tagline:"Keep it flowing", desc:"Cleavers, red clover and calendula gently move stagnant lymph and support immune drainage.", ingredients:["Cleavers","Red Clover","Calendula","Echinacea"], price:18.99, benefit:"Lymph · Immune · Drainage", steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Swollen nodes · Sluggish", oz:2, cupsPerOz:12, servingSize:"1 tsp", protocol:"2 cups daily for 14 days.", days:14, warning:"Contains Echinacea -- not for autoimmune conditions or immunosuppressant medications. Not for use during pregnancy." },
  { id:"c6", name:"Gut Reset", organ:"Digestive", tagline:"Start fresh from the inside", desc:"Slippery elm, marshmallow root and licorice coat and heal the gut lining gently.", ingredients:["Slippery Elm","Marshmallow Root","Licorice Root","Fennel Seed"], price:19.99, benefit:"Gut · Leaky Gut · Soothe", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat -- steam rising, not boiling", mood:"Leaky gut · Inflammation", oz:2, cupsPerOz:10, servingSize:"1 tsp", protocol:"1 cup 20 minutes before each meal for 14 days.", days:14 },
  { id:"c7", name:"Blood Purifier", organ:"Blood", tagline:"Clean blood, clear life", desc:"Red clover, burdock and yellow dock are classic blood-purifying herbs used for centuries.", ingredients:["Red Clover","Burdock Root","Yellow Dock","Nettle Leaf"], price:19.99, benefit:"Blood · Skin · Purify", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Skin issues · Toxin buildup", oz:2, cupsPerOz:10, servingSize:"1 tsp", protocol:"2 cups daily for 21 days.", days:21, warning:"Contains Yellow Dock -- not for use during pregnancy. Consult your doctor if you have hemochromatosis." },
  { id:"c8", name:"Full Body Detox", organ:"Full Body", tagline:"The complete reset", desc:"A comprehensive blend targeting liver, kidney, and lymph for a complete system cleanse.", ingredients:["Dandelion Root","Milk Thistle","Nettle Leaf","Cleavers","Burdock Root"], price:24.99, benefit:"Full Body · Complete · Reset", steepMin:12, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Need a full reset", oz:2, cupsPerOz:9, servingSize:"11/2 tsp", protocol:"2 cups daily for 28 days. Eat clean. Hydrate well.", days:28, warning:"Not for use during pregnancy or breastfeeding. Consult your doctor if on prescription medications. For healthy adults only." },
  { id:"c9", name:"Liver Bile Flow", organ:"Liver", tagline:"Move what needs to move", desc:"Artichoke leaf, dandelion and milk thistle stimulate healthy bile production and liver flow.", ingredients:["Artichoke Leaf","Dandelion Root","Milk Thistle","Turmeric"], price:20.99, benefit:"Bile · Fat digestion · Liver", steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"Poor fat digestion", oz:2, cupsPerOz:10, servingSize:"1 tsp", protocol:"1 cup 30 minutes before meals for 14 days.", days:14, warning:"Not for use during pregnancy. Consult your doctor if you have gallbladder disease or are on prescription medications." },
  { id:"c10", name:"Urinary Tract Clear", organ:"Urinary", tagline:"Heal, flush, protect", desc:"Uva ursi, corn silk and marshmallow root support and soothe the urinary tract naturally.", ingredients:["Uva Ursi","Corn Silk","Marshmallow Root","Juniper Berry"], price:19.99, benefit:"UTI · Urinary · Soothe", steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil -- boil then wait 60 sec", mood:"UTI symptoms", oz:2, cupsPerOz:11, servingSize:"1 tsp", protocol:"3 cups daily for 7 days. Not during pregnancy.", days:7 , warning:"Contains Uva Ursi -- NOT for use during pregnancy. Do not use for more than 7-10 days continuously. Not for use with kidney disease." },
];

const HERBS = [
  { id:"h1",  name:"Ceylon Cinnamon",    price:8.99,  photo:"/herbs/cinnamon.jpg",    fallback:"https://images.pexels.com/photos/15529707/pexels-photo-15529707.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Blood sugar · Warmth · Anti-inflammatory", pairs:["Ginger Root","Cardamom Pods","Cloves"] },
  { id:"h2",  name:"Ginger Root",        price:7.99,  photo:"/herbs/ginger.jpg",      fallback:"https://images.pexels.com/photos/10112135/pexels-photo-10112135.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Digestion · Nausea · Circulation", pairs:["Ceylon Cinnamon","Lemon Balm","Turmeric Root"] },
  { id:"h3",  name:"Turmeric Root",      price:8.99,  photo:"/herbs/turmeric.jpg",    fallback:"https://images.pexels.com/photos/36075348/pexels-photo-36075348.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Anti-inflammatory · Liver · Joints", pairs:["Ginger Root","Black Pepper","Ashwagandha Root"] },
  { id:"h4",  name:"Dandelion Root",     price:7.99,  photo:"/herbs/dandelion.jpg",   fallback:"https://images.pexels.com/photos/14379617/pexels-photo-14379617.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Liver cleanse · Digestion · Detox", pairs:["Milk Thistle","Burdock Root","Nettle Leaf"] },
  { id:"h5",  name:"Chamomile Flowers",  price:9.99,  photo:"/herbs/chamomile.jpg",   fallback:"https://images.pexels.com/photos/33076903/pexels-photo-33076903.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Sleep · Calm · Anxiety · Digestion", pairs:["Lavender","Lemon Balm","Passionflower"] },
  { id:"h6",  name:"Cardamom Pods",      price:10.99, photo:"/herbs/cardamom.jpg",    fallback:"https://images.pexels.com/photos/735719/pexels-photo-735719.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Digestion · Breath · Energy", pairs:["Ceylon Cinnamon","Ginger Root","Cloves"] },
  { id:"h7",  name:"Milk Thistle",       price:9.99,  photo:"/herbs/milk-thistle.jpg",fallback:"https://images.pexels.com/photos/18026461/pexels-photo-18026461.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Liver protection · Detox · Regeneration", pairs:["Dandelion Root","Turmeric Root","Burdock Root"] },
  { id:"h8",  name:"Peppermint Leaf",    price:6.99,  photo:"/herbs/peppermint.jpg",  fallback:"https://images.pexels.com/photos/2056856/pexels-photo-2056856.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Digestion · IBS · Energy · Headaches", pairs:["Lemon Balm","Chamomile Flowers","Fennel Seed"] },
  { id:"h9",  name:"Nettle Leaf",        price:7.99,  photo:"/herbs/nettle.jpg",      fallback:"https://images.pexels.com/photos/14379617/pexels-photo-14379617.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Kidney · Iron · Allergy · Minerals", pairs:["Dandelion Root","Red Clover","Oat Straw"] },
  { id:"h10", name:"Hibiscus Flower",    price:8.99,  photo:"/herbs/hibiscus.jpg",    fallback:"https://images.pexels.com/photos/36327618/pexels-photo-36327618.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Blood pressure · Vitamin C · Heart", pairs:["Rose Petals","Lemon Peel","Rosehip"] },
  { id:"h11", name:"Ashwagandha Root",   price:11.99, photo:"/herbs/ashwagandha.jpg", fallback:"https://images.pexels.com/photos/4871159/pexels-photo-4871159.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Stress · Hormones · Energy · Adaptogen", pairs:["Tulsi (Holy Basil)","Turmeric Root","Ginger Root"] },
  { id:"h12", name:"Rose Petals",        price:9.99,  photo:"/herbs/rose-petals.jpg", fallback:"https://images.pexels.com/photos/31717520/pexels-photo-31717520.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Mood · Skin · Antioxidant · Heart", pairs:["Hibiscus Flower","Chamomile Flowers","Lavender"] },
  { id:"h13", name:"Lavender",           price:9.99,  photo:"/herbs/lavender.jpg",    fallback:"https://images.pexels.com/photos/949585/pexels-photo-949585.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Anxiety · Sleep · Headaches · Nervous system", pairs:["Chamomile Flowers","Passionflower","Rose Petals"] },
  { id:"h14", name:"Lemon Balm",         price:8.99,  photo:"/herbs/lemon-balm.jpg",  fallback:"https://images.pexels.com/photos/16757214/pexels-photo-16757214.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Anxiety · Sleep · Digestion · Antiviral", pairs:["Peppermint Leaf","Chamomile Flowers","Passionflower"] },
  { id:"h15", name:"Passionflower",      price:10.99, photo:"/herbs/passionflower.jpg",fallback:"https://images.pexels.com/photos/14981842/pexels-photo-14981842.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Anxiety · Insomnia · Racing mind", pairs:["Valerian Root","Chamomile Flowers","Lemon Balm"] },
  { id:"h16", name:"Tulsi (Holy Basil)", price:9.99,  photo:"/herbs/tulsi.jpg",       fallback:"https://images.pexels.com/photos/29657646/pexels-photo-29657646.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Adaptogen · Cortisol · Clarity · Immune", pairs:["Ashwagandha Root","Ginger Root","Lemon Balm"] },
  { id:"h17", name:"Valerian Root",      price:10.99, photo:"/herbs/valerian.jpg",    fallback:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Insomnia · Deep sleep · Anxiety · Muscle", pairs:["Passionflower","Chamomile Flowers","Skullcap"] },
  { id:"h18", name:"Burdock Root",       price:8.99,  photo:"/herbs/burdock.jpg",     fallback:"https://images.pexels.com/photos/30009876/pexels-photo-30009876.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Liver · Blood purifier · Skin · Prebiotic", pairs:["Dandelion Root","Nettle Leaf","Yellow Dock"] },
  { id:"h19", name:"Elderberry",         price:12.99, photo:"/herbs/elderberry.jpg",  fallback:"https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Immune · Antiviral · Cold & flu", pairs:["Echinacea Root","Ginger Root","Rose Petals"] },
  { id:"h20", name:"Echinacea Root",     price:10.99, photo:"/herbs/echinacea.jpg",   fallback:"https://images.pexels.com/photos/9160278/pexels-photo-9160278.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Immune stimulant · Antiviral · Infection", pairs:["Elderberry","Ginger Root","Tulsi (Holy Basil)"] },
  { id:"h21", name:"Fennel Seed",        price:6.99,  photo:"/herbs/fennel.jpg",      fallback:"https://images.pexels.com/photos/5988041/pexels-photo-5988041.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Digestion · Gas · Bloating · IBS", pairs:["Peppermint Leaf","Ginger Root","Chamomile Flowers"] },
  { id:"h22", name:"Corn Silk",          price:7.99,  photo:"/herbs/corn-silk.jpg",   fallback:"https://images.pexels.com/photos/34564981/pexels-photo-34564981.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Kidney · Urinary tract · Fluid balance", pairs:["Nettle Leaf","Marshmallow Root","Parsley Root"] },
  { id:"h23", name:"Marshmallow Root",   price:8.99,  photo:"/herbs/marshmallow.jpg", fallback:"https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Gut lining · Throat · Urinary · Soothe", pairs:["Slippery Elm","Licorice Root","Chamomile Flowers"] },
  { id:"h24", name:"Skullcap",           price:10.99, photo:"/herbs/skullcap.jpg",    fallback:"https://images.pexels.com/photos/16708869/pexels-photo-16708869.jpeg?auto=compress&cs=tinysrgb&w=400", benefit:"Nervous system · Anxiety · Sleep · Nerve pain", pairs:["Valerian Root","Passionflower","Lemon Balm"] },
];

const BUNDLES = [
  { id:"bun1", name:"The Cleanse Bundle", desc:"A full 2-week cleanse protocol -- liver, kidney, and golden restoration.", includes:["Liver & Love","Kidney Flush","Turmeric Tonic"], price:49.99, savings:10.97, tag:"Most Popular", emoji:"✦" },
  { id:"bun2", name:"Morning & Evening Ritual", desc:"Start and end every day in harmony with yourself.", includes:["Morning Rise","2AM Reset","Chamomile & Calm"], price:44.99, savings:7.98, tag:"Daily Practice", emoji:"☀" },
  { id:"bun3", name:"Blend-Your-Own Starter", desc:"Six premium herbs to craft your own recipes at home.", includes:["Ceylon Cinnamon","Ginger Root","Chamomile","Turmeric","Peppermint","Cardamom"], price:39.99, savings:11.95, tag:"DIY Kit", emoji:"🌿" },
  { id:"bun4", name:"Immune Fortress", desc:"Everything you need to build and protect your immune system year-round.", includes:["Elderberry Shield","Turmeric Tonic","Adaptogen Blend"], price:54.99, savings:12.98, tag:"Best Defense", emoji:"🛡" },
  { id:"bun5", name:"Sleep Deep Bundle", desc:"A complete sleep support system for restless nights.", includes:["Valerian Rest","Chamomile & Calm","Sleepy Spice"], price:47.99, savings:7.97, tag:"Sleep Support", emoji:"🌙" },
  { id:"bun6", name:"Full Body Reset", desc:"The complete 28-day reset -- inside and out.", includes:["Full Body Detox","Gut Reset","Blood Purifier"], price:57.99, savings:7.97, tag:"28-Day Reset", emoji:"🔄" },
];

const BREW_TOOLS = [
  {
    id:"t1",
    name:"Carved Wood Cup",
    tagline:"The ritual starts in the hands",
    desc:"Hand-turned from sustainable acacia wood. Smooth, warm to the touch, and completely unique -- no two cups are alike. Holding it in both hands is part of the medicine.",
    photo:"/brew-tools/wood-cup.jpg",
    fallback:"https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=600",
    price:34.00,
    material:"Acacia Wood",
    capacity:"10 oz",
    badge:"Handcrafted",
    ritual:"Morning & Evening",
    care:"Hand wash only. Occasional food-grade mineral oil conditioning.",
    emoji:"🪵",
  },
  {
    id:"t2",
    name:"Matte Ceramic Cup",
    tagline:"Earthy. Grounding. Beautiful.",
    desc:"Wheel-thrown stoneware with a matte earth-tone glaze. Thick walls hold heat longer, so you can sip slowly, without rushing. Because you deserve that.",
    photo:"/brew-tools/ceramic-cup.jpg",
    fallback:"https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600",
    price:28.00,
    material:"Stoneware Ceramic",
    capacity:"12 oz",
    badge:"Handmade",
    ritual:"All Day",
    care:"Dishwasher safe. Microwave safe.",
    emoji:"☕",
  },
  {
    id:"t3",
    name:"Double-Wall Glass Cup",
    tagline:"Watch your brew come alive",
    desc:"Borosilicate double-wall glass keeps your tea hot while staying cool to the touch. Watching a hibiscus steep into deep ruby is its own kind of meditation.",
    photo:"/brew-tools/glass-cup.jpg",
    fallback:"https://images.pexels.com/photos/2318904/pexels-photo-2318904.jpeg?auto=compress&cs=tinysrgb&w=600",
    price:24.00,
    material:"Borosilicate Glass",
    capacity:"10 oz",
    badge:"Modern Classic",
    ritual:"Visual Ritual",
    care:"Dishwasher safe top rack. Handle with care.",
    emoji:"🫙",
  },
  {
    id:"t4",
    name:"Stainless Fine Mesh Strainer",
    tagline:"No rushing. No compromises.",
    desc:"A fine 100-mesh stainless steel strainer that catches even the finest herb particles. Clean pours, every time. The right strainer means you never have to hurry your steep.",
    photo:"/brew-tools/strainer.jpg",
    fallback:"https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=600",
    price:14.00,
    material:"304 Stainless Steel",
    capacity:"Fits cups up to 4\" dia.",
    badge:"Essential Tool",
    ritual:"Every Brew",
    care:"Rinse after each use. Dishwasher safe.",
    emoji:"✦",
  },
  {
    id:"t5",
    name:"Clay Teapot",
    tagline:"The vessel that holds the ceremony",
    desc:"Unglazed red clay teapot, seasoned over time with the teas you brew. Clay is porous -- it absorbs the memory of every blend, deepening the flavour of each pot you make.",
    photo:"https://images.pexels.com/photos/19553534/pexels-photo-19553534.jpeg?auto=compress&cs=tinysrgb&w=600",
    fallback:"https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=600",
    price:58.00,
    material:"Unglazed Red Clay (Yixing-style)",
    capacity:"16 oz",
    badge:"Ceremonial",
    ritual:"Deep Practice",
    care:"Rinse only -- no soap. Seasons beautifully with use.",
    emoji:"🫖",
  },
  {
    id:"t6",
    name:"Bamboo Honey Dipper",
    tagline:"One small sweetness",
    desc:"Turned from a single piece of bamboo. Drizzle raw honey into your evening blend and feel the small ceremony of it. The right tools make the ritual feel like an act of love.",
    photo:"/brew-tools/honey-dipper.jpg",
    fallback:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=600",
    price:9.00,
    material:"Natural Bamboo",
    capacity:"One drop at a time",
    badge:"Small Joy",
    ritual:"Evening Sweetness",
    care:"Hand wash. Air dry.",
    emoji:"🍯",
  },
];

const BLEND_EMOJIS = {
  m1:"🌿", m2:"🍂", m3:"🪵", m4:"🫚", m5:"🌱", m6:"⚡", m7:"🍋", m8:"🌰",
  e1:"✿",  e2:"🌙", e3:"💛", e4:"🌹", e5:"🌙", e6:"💜", e7:"🌿", e8:"🌀",
  s1:"✨",  s2:"🫐", s3:"🍂", s4:"🌸", s5:"❄️", s6:"🌺", s7:"🍄",
  w1:"🌱",  w2:"❤️", w3:"🧠", w4:"🌸", w5:"🌿", w6:"🌻", w7:"🕊️",
};

const RINGS = [
  { id:"r1", photo:imgSre1,    name:"The Spiral",    tagline:"Spin your focus back",         desc:"Our original. A smooth-spinning outer band over a solid inner core -- precision-engineered for the overthinker who needs quiet, tactile grounding on demand.", price:38.00, material:"Cream · Meridian Infused",        symbol:"◎", color:"Cream" },
  { id:"r2", photo:imgScre2,   name:"The Sage",      tagline:"For the quiet overthinker",   desc:"Subtle and refined. Built for those who think deeply and need an equally refined tool to match. Spins so smoothly you'll forget it's a fidget ring.", price:52.00, material:"Electric Blue · Meridian Infused", symbol:"⊙", color:"Electric Blue" },
  { id:"r3", photo:imgScre3,   name:"The Anchor",    tagline:"Grounded. Present. Locked in.", desc:"Wider band, heavier spin. Made for high-stimulation days when you need more tactile weight to pull your focus back to center.", price:44.00, material:"Blue · Meridian Infused",          symbol:"◉", color:"Blue" },
  { id:"r4", photo:imgSre4,    name:"The Whisper",   tagline:"Carry your calm quietly",     desc:"The lightest, most discreet of the collection. Looks purely like jewelry. Nobody in the meeting knows. You just feel better.", price:42.00, material:"Ghost White · Meridian Infused",   symbol:"○", color:"Ghost White" },
  { id:"r5", photo:imgSre5,    name:"The Interrupt", tagline:"Break the pattern. Right now.", desc:"The statement piece. Bold band, maximum spin feedback. When the anxiety is loud and you need a hard interrupt -- this is the one.", price:48.00, material:"Matte Black · Meridian Infused",  symbol:"⊛", color:"Matte Black" },
  { id:"r6", photo:imgSre7,    name:"The Flux",      tagline:"Flow through the noise",      desc:"Slim profile, variable-depth dot cutouts. Built for the minimalist who still needs a tactile outlet -- understated but unmistakably intentional.", price:46.00, material:"Electric Blue · Meridian Infused", symbol:"⬡", color:"Electric Blue" },
];


const MEN_BLENDS = [
  { id:"men1",  name:"Iron Will Morning",        tagline:"Rise with purpose and power",               price:19.99, color:"#2A1A0A", benefit:"Energy · Drive · Focus",         ingredients:["Ashwagandha Root","Rhodiola Rosea","Ginger Root","Black Pepper","Cinnamon"],           steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"A commanding morning blend built on ashwagandha and rhodiola — two of the most studied adaptogens for male energy, resilience, and mental sharpness.", affirmation:"I rise with intention. Today I build.", warning:"Contains Rhodiola. Avoid if on SSRIs or MAOIs." },
  { id:"men2",  name:"Deep Recharge Sleep",      tagline:"Testosterone-restoring deep sleep",          price:18.99, color:"#1A1A3A", benefit:"Deep Sleep · Recovery · Hormones",ingredients:["Valerian Root","Passionflower","Ashwagandha Root","Chamomile","Lemon Balm"],           steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat — steam rising, not boiling", desc:"Quality sleep is where testosterone is produced. This blend targets the deep, restorative stages of sleep that most men are chronically missing.", affirmation:"Rest is not weakness. Rest is where I rebuild.", warning:"Contains Valerian Root. Do not drive after use. Not for use during pregnancy." },
  { id:"men3",  name:"Alpha Brain Focus",        tagline:"Clarity without caffeine or crash",          price:20.99, color:"#1A3A2A", benefit:"Cognition · Memory · Clarity",    ingredients:["Lions Mane Mushroom","Ginkgo Biloba","Peppermint Leaf","Rosemary","Gotu Kola"],        steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Lion's mane and ginkgo biloba are among the most researched herbs for brain function, memory, and cognitive endurance. Zero caffeine. No crash.", affirmation:"My mind is sharp. I think clearly and act decisively.", warning:"Ginkgo Biloba may interact with blood thinners. Consult your doctor if on anticoagulants." },
  { id:"men4",  name:"Heart of a King",          tagline:"Cardiovascular protection",                  price:18.99, color:"#3A0A0A", benefit:"Heart · Circulation · Blood Pressure", ingredients:["Hibiscus Flower","Hawthorn Berry","Motherwort","Lemon Balm","Rose Petals"],          steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Heart disease is the number one killer of men. This blend combines hibiscus (clinically shown to lower blood pressure) with hawthorn for cardiovascular strength.", affirmation:"I protect my heart — the source of my strength.", warning:"May lower blood pressure. If you take antihypertensives, monitor closely and consult your doctor." },
  { id:"men5",  name:"Testosterone Harmony",     tagline:"Hormonal balance and cortisol control",      price:21.99, color:"#2A1A3A", benefit:"Hormones · Cortisol · Balance",  ingredients:["Ashwagandha Root","Nettle Root","Tongkat Ali","Tribulus Terrestris","Licorice Root"], steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Modern life chronically elevates cortisol — which directly suppresses testosterone. This blend targets the cortisol-testosterone axis from both directions.", affirmation:"My body is in balance. My hormones serve my purpose.", warning:"Contains Licorice Root — not for use if you have high blood pressure or heart conditions. Not for long-term use without breaks." },
  { id:"men6",  name:"Primal Fire Libido",       tagline:"Vitality and desire restoration",            price:22.99, color:"#3A1A0A", benefit:"Libido · Vitality · Drive",      ingredients:["Maca Root","Damiana Leaf","Tribulus Terrestris","Ginger Root","Cinnamon"],            steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Low libido is rarely about one thing — it's stress, hormones, circulation, and energy together. Maca and damiana are among the most respected herbs for male vitality.", affirmation:"My vitality is natural. My desire is healthy and whole.", warning:"Damiana may interact with diabetes medications. Avoid if pregnant (for female partners)." },
  { id:"men7",  name:"Prostate Shield",          tagline:"Prevention and long-term prostate health",   price:20.99, color:"#1A3A1A", benefit:"Prostate · Urinary · Prevention", ingredients:["Saw Palmetto","Nettle Root","Green Tea Leaf","Pumpkin Seed","Turmeric Root"],          steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Saw palmetto and nettle root are the most studied herbs for prostate support. This is a long-term maintenance blend — best started early, not after symptoms appear.", affirmation:"I take care of my body before it asks for help.", warning:"Saw Palmetto may affect PSA test results. Inform your doctor before testing." },
  { id:"men8",  name:"Stress Armour",            tagline:"The physiological reality of male stress",   price:19.99, color:"#3A2A1A", benefit:"Cortisol · Nervous System · Calm", ingredients:["Ashwagandha Root","Rhodiola Rosea","Holy Basil","Lemon Balm","Skullcap"],             steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Chronic stress physically degrades the male body — from testosterone to cardiovascular health. This adaptogenic blend builds real physiological stress resistance.", affirmation:"I am not my stress. I am the stillness underneath it.", warning:"Rhodiola should be avoided by those on antidepressants. Skullcap may enhance sedative effects." },
  { id:"men9",  name:"Muscle and Recovery",      tagline:"Post-training repair and inflammation",      price:19.99, color:"#2A3A1A", benefit:"Recovery · Inflammation · Repair", ingredients:["Turmeric Root","Ginger Root","Tart Cherry","Black Pepper","Boswellia"],               steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Turmeric and tart cherry are evidence-backed for reducing exercise-induced inflammation. This blend supports recovery — so your next session starts stronger.", affirmation:"I give my body what it earned. Rest and recovery are part of the work." },
  { id:"men10", name:"Blood Pressure Balance",   tagline:"The silent killer addressed directly",       price:18.99, color:"#3A0A1A", benefit:"Blood Pressure · Heart · Minerals", ingredients:["Hibiscus Flower","Hawthorn Berry","Celery Seed","Linden Flower","Olive Leaf"],       steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"High blood pressure has no symptoms until it causes a stroke or heart attack. Hibiscus is one of the few herbs with clinical trial data on blood pressure reduction.", affirmation:"I check in with my body. Awareness is the first form of strength.", warning:"May lower blood pressure. Monitor if on antihypertensive medications." },
  { id:"men11", name:"Meditation and Stillness", tagline:"Permission to go inward",                    price:17.99, color:"#1A2A3A", benefit:"Calm · Presence · Clarity",      ingredients:["Reishi Mushroom","Chamomile","Tulsi Holy Basil","Lemon Balm","Lavender"],              steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat — steam rising, not boiling", desc:"Reishi mushroom has been called the mushroom of spiritual potency for centuries. This blend quiets the nervous system and creates the internal space needed for stillness.", affirmation:"Stillness is not passive. It is where I access my greatest power." },
  { id:"men12", name:"Bone and Joint Fortress",  tagline:"Structural health for the long game",        price:18.99, color:"#2A2A2A", benefit:"Joints · Bones · Mobility",      ingredients:["Nettle Leaf","Horsetail","Turmeric Root","Boswellia","Ginger Root"],                  steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Silica from horsetail and nettle, combined with anti-inflammatory turmeric and boswellia. Built for men who want to be physically capable at 60, 70, and beyond.", affirmation:"I invest in my body today for the man I am becoming." },
  { id:"men13", name:"Metabolic Reset",          tagline:"Visceral fat and insulin sensitivity",       price:19.99, color:"#3A2A0A", benefit:"Metabolism · Fat · Insulin",     ingredients:["Green Tea Leaf","Cinnamon","Fenugreek","Bitter Melon","Ginger Root"],                  steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Visceral fat — the fat around organs — is a uniquely male health risk. Cinnamon and fenugreek are among the most studied herbs for blood sugar and insulin sensitivity.", affirmation:"My metabolism works for me. Every choice I make supports it." },
  { id:"men14", name:"Father's Calm Evening",    tagline:"Intentional decompression",                  price:17.99, color:"#1A2A1A", benefit:"Decompression · Presence · Peace", ingredients:["Chamomile","Lemon Balm","Passionflower","Oat Straw","Lavender"],                      steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat — steam rising, not boiling", desc:"The transition from work mode to presence is one of the hardest things a father does every day. This blend is designed for that specific 20-minute window.", affirmation:"When I walk in the door, I bring peace. That is my greatest gift." },
  { id:"men15", name:"Pre-Game Performance",     tagline:"Peak output when it matters most",           price:21.99, color:"#0A1A3A", benefit:"Performance · Focus · Endurance", ingredients:["Rhodiola Rosea","Eleuthero Root","Ginseng Root","Peppermint Leaf","Licorice Root"],    steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Rhodiola and eleuthero are used by elite military and athletes for endurance, stress resistance, and peak output under pressure. No synthetic stimulants.", affirmation:"I am prepared. I am capable. I perform at my best.", warning:"Contains Ginseng — avoid if you have high blood pressure. Rhodiola: avoid on SSRIs. Not for evening use." },
  { id:"men16", name:"Gut and Digestion Restore",tagline:"The gut-brain axis for men",                 price:18.99, color:"#2A1A2A", benefit:"Gut · Digestion · Microbiome",   ingredients:["Slippery Elm","Marshmallow Root","Fennel Seed","Licorice Root","Chamomile"],           steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat — steam rising, not boiling", desc:"Men's gut health is chronically neglected. The gut-brain axis means gut inflammation directly affects mood, focus, and hormonal balance. This blend repairs the lining.", affirmation:"My gut is the foundation of everything. I take care of it." },
  { id:"men17", name:"Liver Detox Recovery",     tagline:"Repair without shame",                       price:19.99, color:"#1A3A0A", benefit:"Liver · Detox · Regeneration",  ingredients:["Milk Thistle","Dandelion Root","Artichoke Leaf","Turmeric Root","Burdock Root"],        steepMin:10, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Silymarin in milk thistle is one of the most researched hepatoprotective compounds on earth. This blend supports liver regeneration — without judgment about how it got there.", affirmation:"I give my liver what it needs to heal. I am not my past habits." },
  { id:"men18", name:"Vision and Eye Protection",tagline:"Screen damage addressed directly",           price:18.99, color:"#0A2A3A", benefit:"Eyes · Antioxidants · Protection", ingredients:["Bilberry Leaf","Eyebright","Green Tea Leaf","Ginkgo Biloba","Rosehip"],                 steepMin:7, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Bilberry anthocyanins and eyebright have been used for centuries for eye health. Combined with ginkgo for circulation to the optic nerve — built for the screen-heavy modern man.", affirmation:"I protect what allows me to see the people I love.", warning:"Ginkgo may interact with blood thinners. Consult your doctor if on anticoagulants." },
  { id:"men19", name:"Brotherhood Connection",   tagline:"For the men carrying it alone",              price:17.99, color:"#2A0A3A", benefit:"Mood · Connection · Openness",   ingredients:["St Johns Wort","Lemon Balm","Passionflower","Rose Petals","Oat Straw"],                steepMin:8, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Gentle Heat — steam rising, not boiling", desc:"Loneliness and emotional isolation are among the biggest unaddressed health crises in men's lives. St. John's Wort and lemon balm support mood and openness.", affirmation:"I do not have to carry this alone. Asking for help is strength.", warning:"St. John's Wort interacts with MANY medications including antidepressants, birth control, and blood thinners. Consult your doctor before use." },
  { id:"men20", name:"The Elder's Wisdom",       tagline:"Longevity, depth, and ageing with power",    price:22.99, color:"#3A2A1A", benefit:"Longevity · Antioxidants · Clarity", ingredients:["Reishi Mushroom","Ashwagandha Root","Gotu Kola","Turmeric Root","Ginkgo Biloba"],    steepMin:12, oz:2, cupsPerOz:10, servingSize:"1 tsp", steepTemp:"Just Off the Boil — boil then wait 60 sec", desc:"Reishi, ashwagandha, and gotu kola are among the world's most revered longevity herbs. This blend is for the man who is building something that lasts — in his body and his legacy.", affirmation:"I age with power. Each year adds depth, not just years.", warning:"Ginkgo may interact with blood thinners. Consult your doctor if on anticoagulants or medications." },
];

const SEASONAL_PICKS = {
  0:["Winter Warmth","Sleepy Spice"], 1:["Winter Warmth","Adaptogen Blend"], 2:["Spring Cleanse","Tulsi Awakening"],
  3:["Spring Cleanse","Morning Rise"], 4:["Spring Cleanse","Ginger Lemon Sunrise"], 5:["Summer Hibiscus","Brain Boost"],
  6:["Summer Hibiscus","Digestive Peace"], 7:["Summer Hibiscus","Rose & Hibiscus"], 8:["Autumn Harvest","Turmeric Tonic"],
  9:["Autumn Harvest","Stress Less"], 10:["Autumn Harvest","Elderberry Shield"], 11:["Winter Warmth","Chamomile & Calm"],
};

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const RING_DESIGNS = [
  { id:"d1", name:"Spiral · Cream",               hex:"#D4C9A8", desc:"Cream outer with rectangular slot pattern and warm wood inner. Our original.",       ringRef:"r1" },
  { id:"d2", name:"Sage · Electric Blue",          hex:"#3A7ACA", desc:"Blue diagonal-cut outer band. Smooth spin, bold colour.",                            ringRef:"r2" },
  { id:"d3", name:"Anchor · Blue",                 hex:"#5A8ACA", desc:"Blue with large circular cutouts revealing vibrant red inside. Tactile and striking.", ringRef:"r3" },
  { id:"d4", name:"Whisper · Ghost White",         hex:"#E8E4DC", desc:"White open lattice crosshatch. Lightweight, looks like fine jewellery.",              ringRef:"r4" },
  { id:"d5", name:"Interrupt · Matte Black",       hex:"#1A1A2A", desc:"Dark navy with angular cuts and vivid red inner. Maximum interrupt energy.",          ringRef:"r5" },
  { id:"d6", name:"Flux · Slim Blue",              hex:"#4A7AB0", desc:"Slim profile with variable-depth dot cutouts. Understated and precise.",              ringRef:"r6" },
  { id:"d7", name:"Custom -- contact us",          hex:"#4A4A5A", desc:"Want a specific colour combo? Reach out and we'll make it.",                          ringRef:null },
];

// --- HELPERS ------------------------------------------------------------------
const cupsFromOz = (oz, cupsPerOz) => oz * cupsPerOz;
const costPerCup = (price, oz, cupsPerOz) => (price / (oz * cupsPerOz)).toFixed(2);
const tempIcon = (t) => {
  if (t && t.includes("Gentle")) return { icon:"🌿", color:"#4A7250", label:"Gentle Heat", tip:"Steam rising -- do not boil" };
  if (t && t.includes("Full")) return { icon:"🔥", color:"#8B2A2A", label:"Full Boil", tip:"Pour at rolling boil" };
  return { icon:"⏱", color:"#C4893A", label:"Just Off Boil", tip:"Boil then wait 60 seconds" };
};

const CupValue = ({ item, dark }) => {
  if (!item || !item.oz || !item.cupsPerOz) return null;
  const cups = cupsFromOz(item.oz, item.cupsPerOz);
  const cpp = costPerCup(item.price, item.oz, item.cupsPerOz);
  return (
    <div style={{background:dark?"rgba(255,255,255,0.07)":"#F0F7F0",borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:".72rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <span style={{color:dark?"rgba(255,255,255,.7)":"#4A7250"}}>📦 {item.oz}oz · ~{cups} cups · {item.servingSize}/cup</span>
        <span style={{background:dark?"rgba(196,137,58,.25)":"#FFF3E0",color:"#C4893A",padding:"2px 10px",borderRadius:50,fontWeight:500}}>${cpp}/cup</span>
      </div>
      <div style={{color:dark?"rgba(255,255,255,.4)":"#8A9E8A",marginTop:3,fontSize:".66rem"}}>vs. $5-$7 coffee · That's {Math.round(500/cpp)}% better value</div>
    </div>
  );
};

// --- TEA FINDER QUIZ ---------------------------------------------------------
const TEA_FINDER_STEPS = [
  { q:"How's your energy right now?", key:"energy", opts:[{v:"low",l:"Low -- I'm exhausted",e:"😴"},{v:"medium",l:"Medium -- Getting by",e:"😐"},{v:"high",l:"High -- I'm wired",e:"⚡"}] },
  { q:"How are you feeling?", key:"feeling", opts:[{v:"anxious",l:"Anxious or stressed",e:"😰"},{v:"foggy",l:"Foggy or unfocused",e:"🌫"},{v:"tired",l:"Tired or depleted",e:"😪"},{v:"restless",l:"Restless, can't sleep",e:"🌀"},{v:"achy",l:"Achy or inflamed",e:"🔥"},{v:"sad",l:"Low or heavy-hearted",e:"💙"},{v:"stressed",l:"Overwhelmed",e:"🌊"},{v:"uncomfortable",l:"Digestive discomfort",e:"🫃"}] },
  { q:"What time of day is it?", key:"time", opts:[{v:"morning",l:"Morning",e:"🌅"},{v:"evening",l:"Evening",e:"🌙"},{v:"night",l:"Late night",e:"✨"},{v:"anytime",l:"Any time",e:"☀"}] },
];

function LinkUrlInput({ onCommit }) {
  const [val, setVal] = useState('');
  const isValid = /^https?:\/\/.+\..+/.test(val.trim());
  const showError = val.length > 0 && !isValid;
  const showTest = val.length > 0 && isValid;
  return (
    <div>
      <input
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && isValid) { onCommit(val.trim()); } }}
        placeholder="https://open.spotify.com/playlist/... or any web address"
        style={{width:"100%",padding:"10px 14px",background:"rgba(255,255,255,.07)",border:`1px solid ${showError?"rgba(180,60,60,.6)":"rgba(255,255,255,.15)"}`,borderRadius:10,color:"white",fontFamily:"Jost,sans-serif",fontSize:".78rem",outline:"none",marginBottom:showError?6:10,boxSizing:"border-box"}}
      />
      {showError && (
        <div style={{fontSize:".7rem",color:"rgba(255,140,140,.9)",marginBottom:10,paddingLeft:2}}>
          Please enter a valid address starting with https://
        </div>
      )}
      {showTest && (
        <button
          onClick={()=>{ window.open(val.trim(),'_blank'); onCommit(val.trim()); }}
          style={{width:"100%",background:"rgba(196,137,58,.2)",border:"1px solid rgba(196,137,58,.5)",color:"rgba(196,137,58,.9)",padding:"10px",borderRadius:10,fontFamily:"Jost,sans-serif",fontSize:".72rem",letterSpacing:".08em",cursor:"pointer",marginBottom:10}}>
          🔗 Test My Link — Opens in a New Tab
        </button>
      )}
    </div>
  );
}


// --- SUPPLEMENT PAIRINGS MAP (top-level so MensWellness and ChaiHolistic can both access) -----
const SUPP_PAIRINGS = {
  sleep:    [{name:"Magnesium Glycinate",emoji:"🌙",why:"Magnesium activates the same calm pathways your sleep blend targets — from two directions."}],
  stress:   [{name:"Magnesium Glycinate",emoji:"🌙",why:"Chronic stress depletes magnesium. Replenish the mineral while the herbs do their work."},{name:"Ashwagandha KSM-66",emoji:"⚡",why:"KSM-66 works on the cortisol-testosterone axis alongside your adaptogenic blend."}],
  brain:    [{name:"Omega-3 (Nordic Naturals)",emoji:"🐟",why:"DHA is the structural fat your brain runs on. Lion's mane and ginkgo need it to work with."},{name:"B12 Methylcobalamin",emoji:"⚡",why:"B12 is the raw material for myelin — the insulation every nerve signal travels through."}],
  heart:    [{name:"Omega-3 (Nordic Naturals)",emoji:"🐟",why:"EPA+DHA lower triglycerides and reduce inflammation that hawthorn and hibiscus can't reach alone."},{name:"CoQ10 Ubiquinol",emoji:"❤️",why:"The heart beats 100,000x daily. CoQ10 is the cellular fuel it runs on."}],
  joint:    [{name:"Collagen Peptides",emoji:"💪",why:"Collagen is the structural matrix of cartilage. Your anti-inflammatory herbs reduce breakdown — collagen rebuilds it."},{name:"Vitamin D3+K2",emoji:"☀️",why:"D3+K2 directs calcium into bone rather than soft tissue — the foundation your joint blend supports."}],
  immune:   [{name:"Liposomal Vitamin C",emoji:"🍊",why:"Liposomal C achieves tissue levels standard supplements can't. Pairs with your immune herbs for a complete protocol."},{name:"Vitamin D3+K2",emoji:"☀️",why:"Vitamin D is central to immune regulation — 42% of adults are deficient."}],
  liver:    [{name:"Liposomal Vitamin C",emoji:"🍊",why:"Vitamin C is a cofactor in your liver's detox pathways. Supports the work your cleanse blend starts."},{name:"Omega-3 (Nordic Naturals)",emoji:"🐟",why:"Omega-3s reduce liver inflammation and support healthy fat metabolism."}],
  prostate: [{name:"Zinc Bisglycinate",emoji:"🛡",why:"The prostate concentrates zinc higher than any other organ. Herbal support alone can't replace the mineral."},{name:"Vitamin D3+K2",emoji:"☀️",why:"Low vitamin D is consistently associated with poorer prostate outcomes in population studies."}],
  energy:   [{name:"B12 Methylcobalamin",emoji:"⚡",why:"B12 deficiency is one of the most underdiagnosed causes of fatigue. Your adaptogens work better when B12 isn't the bottleneck."},{name:"CoQ10 Ubiquinol",emoji:"❤️",why:"CoQ10 is the cellular energy currency. Adaptogens can't compensate for mitochondrial fuel shortage."}],
  gut:      [{name:"Probiotics (Seed DS-01)",emoji:"🌿",why:"Your gut-healing blend soothes the lining. Probiotics repopulate the microbiome. One prepares the terrain, one plants the seeds."}],
  hormone:  [{name:"Ashwagandha KSM-66",emoji:"⚡",why:"KSM-66 reduces cortisol which directly suppresses testosterone — the same axis your hormone blend targets."},{name:"Zinc Bisglycinate",emoji:"🛡",why:"Zinc is essential for testosterone synthesis. Deficiency directly impairs hormone production."}],
};

const getSuppPairing = (blend) => {
  if (!blend) return [];
  const name = (blend.name||"").toLowerCase();
  const benefit = (blend.benefit||"").toLowerCase();
  const combined = name + " " + benefit + " " + (blend.desc||"").toLowerCase();
  const found = new Map();
  if (/sleep|valerian|passionflower|night|rest|insomn/.test(combined)) SUPP_PAIRINGS.sleep.forEach(s=>found.set(s.name,s));
  if (/stress|cortisol|anxiety|calm|adaptogen|rhodiola|ashwagandha/.test(combined)) SUPP_PAIRINGS.stress.forEach(s=>found.set(s.name,s));
  if (/brain|focus|memory|cognitive|ginkgo|lion|clarity|mental/.test(combined)) SUPP_PAIRINGS.brain.forEach(s=>found.set(s.name,s));
  if (/heart|cardio|blood pressure|hibiscus|hawthorn|circulation/.test(combined)) SUPP_PAIRINGS.heart.forEach(s=>found.set(s.name,s));
  if (/joint|bone|cartilage|boswellia|turmeric|muscle|recovery|inflammation/.test(combined)) SUPP_PAIRINGS.joint.forEach(s=>found.set(s.name,s));
  if (/immune|immunity|vitamin c|echinacea|elderberry/.test(combined)) SUPP_PAIRINGS.immune.forEach(s=>found.set(s.name,s));
  if (/liver|detox|cleanse|milk thistle|dandelion|burdock/.test(combined)) SUPP_PAIRINGS.liver.forEach(s=>found.set(s.name,s));
  if (/prostate|urinary|saw palmetto|pumpkin seed/.test(combined)) SUPP_PAIRINGS.prostate.forEach(s=>found.set(s.name,s));
  if (/energy|drive|performance|fatigue|iron will|pre.game/.test(combined)) SUPP_PAIRINGS.energy.forEach(s=>found.set(s.name,s));
  if (/gut|digest|marshmallow|slippery elm|microbiome/.test(combined)) SUPP_PAIRINGS.gut.forEach(s=>found.set(s.name,s));
  if (/testosterone|hormone|libido|vitality|hormonal/.test(combined)) SUPP_PAIRINGS.hormone.forEach(s=>found.set(s.name,s));
  return [...found.values()].slice(0,2);
};

function MensWellness({ onNav, onAddToCart }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [prostateOpen, setProstateOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const PROSTATE_RECIPES = [
    {
      id:"pr1", name:"Prostate Morning Ritual", sub:"Daily maintenance — start before symptoms appear",
      why:"Saw palmetto is the most studied herb for prostate health, shown in multiple trials to reduce DHT binding at prostate tissue. Nettle root complements it by blocking the same hormonal pathway from a different angle. Green tea adds EGCG — a powerful antioxidant specifically linked to prostate cellular health.",
      ingredients:["1 tsp Saw Palmetto berries (dried, crushed)","1 tsp Nettle Root (dried)","1 tsp Green Tea Leaf","½ tsp Ginger Root (dried)"],
      temp:"Just Off the Boil — wait 60 seconds after boiling",
      steep:"8–10 minutes", when:"First thing in the morning, before food",
      protocol:"Daily, ongoing. Commit to 90 days before evaluating results.",
      warning:"Saw palmetto may affect PSA test results. Always inform your doctor before any prostate screening. Not for use with finasteride without medical supervision.",
      color:"#1a2a1a",
    },
    {
      id:"pr2", name:"Urinary Flow Ease", sub:"For slow start, weak stream, or frequent night trips",
      why:"Corn silk is one of the oldest diuretic and urinary-soothing herbs on record — it coats and calms the urinary tract lining while gently increasing flow. Saw palmetto addresses the prostate enlargement that is often the root cause. Marshmallow root soothes inflammation in the bladder neck and urethra.",
      ingredients:["1 tsp Saw Palmetto berries (dried, crushed)","1 tsp Corn Silk (dried)","1 tsp Marshmallow Root","½ tsp Linden Flower"],
      temp:"Gentle Heat — steam rising, not boiling",
      steep:"10–12 minutes", when:"Mid-morning and early afternoon. Avoid after 6pm.",
      protocol:"Daily for 30 days, then assess. Consult your doctor if symptoms persist.",
      warning:"Saw palmetto may affect PSA test results. If you experience sudden inability to urinate, seek medical attention immediately.",
      color:"#1a1a3a",
    },
    {
      id:"pr3", name:"BPH Support Brew", sub:"Targeted at benign prostatic hyperplasia symptoms",
      why:"This blend combines the four most clinically studied herbs for BPH. Saw palmetto and pygeum together show stronger results in trials than either alone. Pumpkin seed oil provides zinc and phytosterols that directly support prostate tissue. Nettle root adds dual-action: anti-inflammatory and DHT-pathway blocking.",
      ingredients:["1 tsp Saw Palmetto berries (dried, crushed)","½ tsp Pygeum Bark (dried, powdered)","1 tsp Pumpkin Seed (ground)","1 tsp Nettle Root"],
      temp:"Just Off the Boil — wait 60 seconds",
      steep:"10 minutes — strain well", when:"Once daily, morning preferred.",
      protocol:"Commit to 60–90 days. BPH herbs work slowly. Not a substitute for medical evaluation.",
      warning:"Saw palmetto may affect PSA test results. Pygeum: cycle 6 weeks on, 2 weeks off. Not a substitute for BPH diagnosis.",
      color:"#2a1a0a",
    },
    {
      id:"pr4", name:"Prostate Anti-Inflammation", sub:"Addressing the inflammation component directly",
      why:"Chronic prostate inflammation is increasingly recognized as a driver of both BPH and prostate cancer risk. Turmeric's curcumin and boswellia's boswellic acids are two of the most studied anti-inflammatory compounds. Black pepper increases curcumin absorption by up to 2000% — without it, most passes through unabsorbed.",
      ingredients:["1 tsp Saw Palmetto berries (dried, crushed)","1 tsp Turmeric Root (dried)","½ tsp Boswellia Resin (powdered)","½ tsp Ginger Root","¼ tsp Black Pepper (coarsely ground)"],
      temp:"Full Rolling Boil — pour immediately",
      steep:"8 minutes — add a small amount of whole milk or coconut milk", when:"With a meal containing healthy fat.",
      protocol:"Daily for 60 days. Anti-inflammatory effects are cumulative.",
      warning:"Boswellia may thin blood slightly — consult your doctor if on anticoagulants. Turmeric at high doses may irritate the gallbladder.",
      color:"#2a1a00",
    },
    {
      id:"pr5", name:"Zinc & Saw Palmetto Tonic", sub:"Mineral-rich support for prostate tissue integrity",
      why:"The prostate concentrates zinc at higher levels than any other organ — and zinc deficiency is consistently associated with prostate problems. Horsetail and nettle leaf are among the highest plant sources of silica and trace minerals. This is a nutritional foundation blend, less symptomatic and more structural.",
      ingredients:["1 tsp Saw Palmetto berries (dried, crushed)","1 tsp Nettle Leaf (not root — for mineral content)","1 tsp Horsetail (dried)","1 tsp Oat Straw","½ tsp Pumpkin Seed (ground)"],
      temp:"Just Off the Boil — wait 60 seconds",
      steep:"10–12 minutes for maximum mineral extraction", when:"Morning or midday.",
      protocol:"Daily, long-term. Think of this as a mineral supplement in tea form.",
      warning:"Horsetail: no more than 6 weeks continuous use without a break. Not for use with kidney disease.",
      color:"#0a2a1a",
    },
    {
      id:"pr6", name:"PSA Defense Blend", sub:"Antioxidant-forward for long-term prostate cellular health",
      why:"Green tea's EGCG is one of the most studied compounds for prostate cellular health — population studies show significantly lower prostate cancer rates in heavy green tea drinkers. Pomegranate contains ellagitannins converted to urolithins, which show selective activity against prostate cancer cells in lab studies.",
      ingredients:["1 tsp Green Tea Leaf (high quality)","1 tsp Pomegranate Leaf or Rind (dried)","½ tsp Saw Palmetto berries (dried, crushed)","½ tsp Rosehip (dried)","¼ tsp Turmeric Root"],
      temp:"Just Off the Boil — wait 90 seconds (green tea gets bitter above 85°C)",
      steep:"5–6 minutes maximum", when:"Mid-morning, between meals for best absorption.",
      protocol:"Daily. This is a lifetime prevention blend, not a treatment.",
      warning:"Contains caffeine — not ideal for evening. Pomegranate may interact with statins and blood thinners.",
      color:"#1a2a00",
    },
    {
      id:"pr7", name:"Night Flow Reset", sub:"For nocturia — nighttime bathroom trips — plus sleep support",
      why:"Nocturia is one of the most quality-of-life-destroying symptoms of prostate issues. This blend addresses both sides: saw palmetto and corn silk work on the urinary-prostate pathway, while valerian and linden flower promote genuine deep sleep. The sedative herbs also reduce bladder urgency signals from the nervous system.",
      ingredients:["½ tsp Saw Palmetto berries (dried, crushed)","½ tsp Corn Silk","1 tsp Valerian Root","1 tsp Linden Flower","½ tsp Passionflower"],
      temp:"Gentle Heat — steam rising, not boiling",
      steep:"10 minutes, covered", when:"45–60 minutes before bed.",
      protocol:"Nightly for 30 days. Stop fluids 2 hours before bed for best results.",
      warning:"Contains Valerian Root — causes drowsiness. Do not drive after use. If nocturia exceeds 3× per night, see your doctor.",
      color:"#0a0a2a",
    },
    {
      id:"pr8", name:"Testosterone & Prostate Balance", sub:"Addressing the DHT-testosterone-prostate axis together",
      why:"BPH and low testosterone are both driven partly by conversion of testosterone to DHT via 5-alpha-reductase. Saw palmetto and nettle root both inhibit this enzyme — protecting the prostate while helping preserve free testosterone. Ashwagandha supports the HPA axis and cortisol regulation that suppresses testosterone when chronically elevated.",
      ingredients:["1 tsp Saw Palmetto berries (dried, crushed)","1 tsp Nettle Root","1 tsp Ashwagandha Root","½ tsp Ginger Root"],
      temp:"Just Off the Boil — wait 60 seconds",
      steep:"10 minutes", when:"Morning, with or without food.",
      protocol:"Daily for 90 days minimum. Hormonal herbs require sustained use.",
      warning:"Ashwagandha may interact with thyroid medications and sedatives. If on hormone therapy, consult your doctor before use.",
      color:"#2a0a1a",
    },
    {
      id:"pr9", name:"Post-50 Men's Foundation", sub:"A comprehensive daily blend for men over 50",
      why:"After 50, men face a convergence: declining testosterone, rising DHT, increasing cardiovascular risk, cognitive changes, and chronic inflammation. This blend addresses all five pathways in a single daily cup. Reishi adds immune modulation. Ginkgo maintains cerebrovascular circulation that often begins to decline in this decade.",
      ingredients:["½ tsp Saw Palmetto berries (dried, crushed)","½ tsp Nettle Root","½ tsp Ashwagandha Root","½ tsp Reishi Mushroom (powdered)","½ tsp Ginkgo Biloba (dried leaf)"],
      temp:"Just Off the Boil — wait 60 seconds",
      steep:"12 minutes — full extraction from root and mushroom", when:"Morning, every day.",
      protocol:"Lifelong daily use. Cycle off 1 week every 3 months to avoid adaptogenic tolerance.",
      warning:"Ginkgo biloba interacts with blood thinners, aspirin, and NSAIDs. Ashwagandha may affect thyroid medications. Not a substitute for regular screenings after 50.",
      color:"#1a1a1a",
    },
    {
      id:"pr10", name:"Prostate Cleanse Protocol", sub:"A 14-day detox targeting the prostate-urinary system",
      why:"This is a periodic reset — use for 14 days, 2–3 times per year. Dandelion root and burdock support liver detoxification of prostate-related hormone metabolites. Uva ursi is a powerful urinary antibacterial, traditionally used for UTIs but also effective for mild prostatitis. Saw palmetto anchors the prostate action throughout.",
      ingredients:["1 tsp Saw Palmetto berries (dried, crushed)","1 tsp Dandelion Root","½ tsp Burdock Root","½ tsp Uva Ursi Leaf","½ tsp Corn Silk"],
      temp:"Just Off the Boil — wait 60 seconds",
      steep:"10 minutes, drink while warm", when:"2 cups daily — morning and early afternoon only.",
      protocol:"14 days on, minimum 6 weeks off before repeating. Eat clean: reduce alcohol, processed food, red meat.",
      warning:"Uva ursi: do NOT use more than 14 days continuously. Not for kidney disease or pregnancy. Stop immediately and see a doctor if you experience burning urination, blood in urine, or fever. Burdock may lower blood sugar — monitor if diabetic.",
      color:"#1a2a2a",
    },
  ];

  const CATEGORIES = [
    { key:"all",      label:"All 20 Blends",       emoji:"⚡" },
    { key:"energy",   label:"Energy & Performance", emoji:"💪" },
    { key:"mind",     label:"Mind & Focus",         emoji:"🧠" },
    { key:"heart",    label:"Heart & Hormones",     emoji:"❤️" },
    { key:"recovery", label:"Recovery & Rest",      emoji:"🌙" },
    { key:"gut",      label:"Gut & Detox",          emoji:"🌿" },
    { key:"prostate", label:"Prostate & Urinary",   emoji:"🛡" },
  ];

  const CAT_MAP = {
    energy:   ["men1","men6","men15"],
    mind:     ["men3","men8","men11","men18","men19"],
    heart:    ["men4","men5","men10"],
    recovery: ["men2","men9","men12","men14"],
    gut:      ["men7","men13","men16","men17","men20"],
  };

  const showProstate = filter === "prostate";
  const visible = showProstate ? [] : (filter === "all" ? MEN_BLENDS : MEN_BLENDS.filter(b => (CAT_MAP[filter]||[]).includes(b.id)));

  return (
    <div id="sec-men-top" style={{minHeight:"100vh", background:"linear-gradient(180deg,#0D0D1A 0%,#1A1A2A 40%,#0D1A0D 100%)", paddingBottom:80}}>

      {/* HERO */}
      <div style={{textAlign:"center", padding:"64px 24px 40px", position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center top, rgba(196,137,58,.15) 0%, transparent 70%)",pointerEvents:"none"}} />
        <div style={{fontSize:".65rem",letterSpacing:".28em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:12}}>Chai Holistic · For Men</div>
        <h1 style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(2rem,6vw,3.2rem)",fontWeight:700,color:"#F7F2EA",margin:"0 0 12px",lineHeight:1.15}}>
          Sip &amp; Heal
        </h1>
        <h2 style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(1.1rem,3vw,1.6rem)",fontWeight:400,fontStyle:"italic",color:"rgba(196,137,58,.9)",margin:"0 0 20px"}}>
          The Men's Collection
        </h2>
        <p style={{fontFamily:"Jost,sans-serif",fontSize:"clamp(.82rem,2vw,.95rem)",color:"rgba(247,242,234,.65)",maxWidth:560,margin:"0 auto 32px",lineHeight:1.7}}>
          20 blends built specifically for the male body — addressing what men actually face: testosterone, heart health, stress, prostate, recovery, and more. No fluff. Real herbs. Real results.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          {[["20 Blends","🍵"],["Evidence-Based","⚗️"],["Caffeine-Free","✓"],["FDA Compliant","🛡"]].map(([l,e])=>(
            <div key={l} style={{background:"rgba(196,137,58,.12)",border:"1px solid rgba(196,137,58,.25)",borderRadius:40,padding:"7px 16px",fontSize:".68rem",letterSpacing:".12em",color:"rgba(196,137,58,.9)",textTransform:"uppercase",fontFamily:"Jost,sans-serif"}}>
              {e} {l}
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div id="sec-men-blends" style={{padding:"0 16px 32px"}}>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,WebkitOverflowScrolling:"touch",scrollbarWidth:"none",maxWidth:900,margin:"0 auto"}}>
          {CATEGORIES.map(c=>(
            <button key={c.key} onClick={()=>setFilter(c.key)} style={{
              flexShrink:0, background: filter===c.key ? "rgba(196,137,58,.9)" : "rgba(255,255,255,.05)",
              border:"1px solid " + (filter===c.key ? "rgba(196,137,58,.9)" : "rgba(255,255,255,.15)"),
              color: filter===c.key ? "#0D0D1A" : "rgba(247,242,234,.75)",
              borderRadius:40, padding:"8px 16px", fontSize:".7rem", letterSpacing:".1em",
              textTransform:"uppercase", cursor:"pointer", fontFamily:"Jost,sans-serif",
              fontWeight: filter===c.key ? 700 : 400, transition:"all .2s",
              whiteSpace:"nowrap"
            }}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* BLEND GRID */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(300px,100%),1fr))",gap:20}}>
        {visible.map(blend=>(
          <div key={blend.id} onClick={()=>setSelected(blend)} style={{
            background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.1)",
            borderRadius:16, overflow:"hidden", cursor:"pointer",
            transition:"transform .2s, box-shadow .2s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.4)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
          >
            {/* Color band */}
            <div style={{height:6, background:`linear-gradient(90deg, ${blend.color}, rgba(196,137,58,.6))`}} />
            <div style={{padding:"20px 20px 16px"}}>
              <div style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6,fontFamily:"Jost,sans-serif"}}>{blend.benefit}</div>
              <div style={{fontFamily:"Playfair Display,serif",fontSize:"1.1rem",fontWeight:600,color:"#F7F2EA",marginBottom:4}}>{blend.name}</div>
              <div style={{fontSize:".8rem",fontStyle:"italic",color:"rgba(247,242,234,.55)",marginBottom:12,fontFamily:"Jost,sans-serif"}}>{blend.tagline}</div>
              <p style={{fontSize:".78rem",color:"rgba(247,242,234,.7)",lineHeight:1.65,marginBottom:14,fontFamily:"Jost,sans-serif"}}>{blend.desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
                {blend.ingredients.map(herb=>(
                  <span key={herb} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:"3px 10px",fontSize:".63rem",color:"rgba(247,242,234,.65)",fontFamily:"Jost,sans-serif"}}>{herb}</span>
                ))}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontFamily:"Playfair Display,serif",fontSize:"1.1rem",color:"rgba(196,137,58,.9)",fontWeight:600}}>${blend.price.toFixed(2)}</div>
                <button style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.4)",color:"rgba(196,137,58,.9)",borderRadius:40,padding:"7px 18px",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",fontFamily:"Jost,sans-serif",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(196,137,58,.9)";e.currentTarget.style.color="#0D0D1A";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(196,137,58,.15)";e.currentTarget.style.color="rgba(196,137,58,.9)";}}>
                  View Blend →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FDA DISCLAIMER */}
      <div style={{maxWidth:900,margin:"40px auto 0",padding:"0 16px"}}>
        <p style={{fontSize:".65rem",color:"rgba(247,242,234,.35)",textAlign:"center",lineHeight:1.7,fontFamily:"Jost,sans-serif"}}>
          These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before beginning any herbal regimen, especially if you take prescription medications.
        </p>
      </div>

      {/* PROSTATE & URINARY RECIPES SECTION */}
      {showProstate && (
        <div id="sec-men-prostate" style={{maxWidth:1100,margin:"0 auto",padding:"0 16px 40px"}}>
          {/* Section header */}
          <div style={{textAlign:"center",marginBottom:32,padding:"0 16px"}}>
            <div style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:10,fontFamily:"Jost,sans-serif"}}>🛡 Evidence-Informed · Saw Palmetto Series</div>
            <h2 style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(1.4rem,4vw,2rem)",color:"#F7F2EA",fontWeight:400,margin:"0 0 12px",lineHeight:1.2}}>
              Prostate &amp; Urinary<br/><em style={{color:"rgba(196,137,58,.85)"}}>Wellness Collection</em>
            </h2>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:".82rem",color:"rgba(247,242,234,.5)",lineHeight:1.75,maxWidth:540,margin:"0 auto 20px"}}>
              10 evidence-informed herbal recipes built specifically around prostate and urinary health. Rooted in herbs with clinical or traditional evidence — not marketing language. Caffeine-free except Recipe 6.
            </p>
            <div style={{background:"rgba(255,180,0,.07)",border:"1px solid rgba(255,180,0,.2)",borderRadius:12,padding:"12px 18px",maxWidth:560,margin:"0 auto",fontSize:".72rem",color:"rgba(255,220,100,.75)",lineHeight:1.65,fontFamily:"Jost,sans-serif"}}>
              ⚠ <strong style={{color:"rgba(255,220,100,.9)"}}>Important:</strong> Saw palmetto appears in 9 of these 10 recipes and can affect PSA test results. Always tell your doctor you are taking it before any prostate screening.
            </div>
          </div>

          {/* Recipe grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(320px,100%),1fr))",gap:16}}>
            {PROSTATE_RECIPES.map((r,i)=>(
              <div key={r.id} onClick={()=>setSelectedRecipe(r)}
                style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"transform .2s,box-shadow .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.4)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                <div style={{height:5,background:`linear-gradient(90deg,rgba(196,137,58,.8),rgba(196,137,58,.3))`}}/>
                <div style={{padding:"18px 20px 16px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
                    <div style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.3)",borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"Jost,sans-serif",fontWeight:700,fontSize:".75rem",color:"rgba(196,137,58,.9)"}}>
                      {String(i+1).padStart(2,"0")}
                    </div>
                    <div>
                      <div style={{fontFamily:"Playfair Display,serif",fontSize:"1rem",fontWeight:600,color:"#F7F2EA",lineHeight:1.2,marginBottom:3}}>{r.name}</div>
                      <div style={{fontFamily:"Jost,sans-serif",fontSize:".68rem",fontStyle:"italic",color:"rgba(247,242,234,.45)"}}>{r.sub}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                    {r.ingredients.slice(0,3).map(ing=>(
                      <span key={ing} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"3px 9px",fontSize:".6rem",color:"rgba(247,242,234,.55)",fontFamily:"Jost,sans-serif"}}>{ing.split(" ").slice(1,3).join(" ")}</span>
                    ))}
                    {r.ingredients.length > 3 && <span style={{fontSize:".6rem",color:"rgba(196,137,58,.5)",fontFamily:"Jost,sans-serif",padding:"3px 6px"}}>+{r.ingredients.length-3} more</span>}
                  </div>
                  <div style={{display:"flex",gap:12,fontSize:".65rem",color:"rgba(247,242,234,.45)",fontFamily:"Jost,sans-serif",marginBottom:14}}>
                    <span>⏱ {r.steep.split(" ").slice(0,2).join(" ")}</span>
                    <span>·</span>
                    <span>🌡 {r.temp.split(" ").slice(0,3).join(" ")}</span>
                  </div>
                  <button style={{background:"rgba(196,137,58,.12)",border:"1px solid rgba(196,137,58,.3)",color:"rgba(196,137,58,.85)",borderRadius:40,padding:"7px 16px",fontSize:".65rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",fontFamily:"Jost,sans-serif",width:"100%",transition:"all .2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(196,137,58,.85)";e.currentTarget.style.color="#0D0D1A";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(196,137,58,.12)";e.currentTarget.style.color="rgba(196,137,58,.85)";}}>
                    View Full Recipe →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{marginTop:28,padding:"16px 20px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,maxWidth:760,margin:"28px auto 0"}}>
            <p style={{fontSize:".65rem",color:"rgba(247,242,234,.3)",textAlign:"center",lineHeight:1.75,margin:0,fontFamily:"Jost,sans-serif"}}>
              No herbal blend replaces regular medical screenings. Men over 50 (or over 40 with family history) should have annual PSA tests. If you take any saw palmetto blend, inform your doctor — it can lower PSA readings, affecting how results are interpreted. These recipes are designed to work alongside your medical care, not replace it.
            </p>
          </div>
        </div>
      )}

      {/* RECIPE DETAIL MODAL */}
      {selectedRecipe && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setSelectedRecipe(null)}>
          <div style={{background:"#14141E",border:"1px solid rgba(196,137,58,.25)",borderRadius:20,maxWidth:540,width:"100%",maxHeight:"92vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{height:6,background:"linear-gradient(90deg,rgba(196,137,58,.9),rgba(196,137,58,.3))",borderRadius:"20px 20px 0 0"}}/>
            <div style={{padding:"22px 24px 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                <div style={{fontSize:".58rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",fontFamily:"Jost,sans-serif"}}>🛡 Prostate &amp; Urinary · Saw Palmetto Series</div>
                <button onClick={()=>setSelectedRecipe(null)} style={{background:"rgba(255,255,255,.08)",border:"none",color:"rgba(247,242,234,.6)",borderRadius:"50%",width:32,height:32,fontSize:"1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
              </div>
              <h3 style={{fontFamily:"Playfair Display,serif",fontSize:"1.3rem",fontWeight:600,color:"#F7F2EA",margin:"8px 0 4px"}}>{selectedRecipe.name}</h3>
              <div style={{fontFamily:"Jost,sans-serif",fontSize:".75rem",fontStyle:"italic",color:"rgba(247,242,234,.45)",marginBottom:18}}>{selectedRecipe.sub}</div>

              {/* Why this works */}
              <div style={{background:"rgba(196,137,58,.06)",border:"1px solid rgba(196,137,58,.15)",borderRadius:12,padding:"14px 16px",marginBottom:16}}>
                <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:8,fontFamily:"Jost,sans-serif",fontWeight:600}}>Why This Works</div>
                <p style={{fontSize:".8rem",color:"rgba(247,242,234,.75)",lineHeight:1.75,margin:0,fontFamily:"Jost,sans-serif"}}>{selectedRecipe.why}</p>
              </div>

              {/* Ingredients */}
              <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"14px 16px",marginBottom:16}}>
                <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:10,fontFamily:"Jost,sans-serif",fontWeight:600}}>Ingredients</div>
                {selectedRecipe.ingredients.map(ing=>(
                  <div key={ing} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.05)",fontSize:".8rem",color:"rgba(247,242,234,.8)",fontFamily:"Jost,sans-serif"}}>
                    <span style={{color:"rgba(196,137,58,.6)",flexShrink:0}}>·</span>{ing}
                  </div>
                ))}
              </div>

              {/* Brew guide */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                {[["⏱ Steep Time",selectedRecipe.steep],["🌡 Temperature",selectedRecipe.temp],["☀ When to Drink",selectedRecipe.when],["📅 Protocol",selectedRecipe.protocol]].map(([lbl,val])=>(
                  <div key={lbl} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10,padding:"12px 13px",gridColumn:lbl.includes("Protocol")||lbl.includes("Temperature")?"span 2":"auto"}}>
                    <div style={{fontSize:".55rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:5,fontFamily:"Jost,sans-serif"}}>{lbl}</div>
                    <div style={{fontSize:".78rem",color:"rgba(247,242,234,.8)",lineHeight:1.5,fontFamily:"Jost,sans-serif"}}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Warning */}
              <div style={{background:"rgba(255,180,0,.06)",border:"1px solid rgba(255,180,0,.18)",borderRadius:10,padding:"12px 14px",marginBottom:20}}>
                <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,180,0,.7)",marginBottom:5,fontFamily:"Jost,sans-serif",fontWeight:600}}>⚠ Safety Note</div>
                <p style={{fontSize:".75rem",color:"rgba(255,240,180,.7)",lineHeight:1.65,margin:0,fontFamily:"Jost,sans-serif"}}>{selectedRecipe.warning}</p>
              </div>

              {/* WHY ORDER OURS — prostate modal */}
              <div style={{background:"rgba(196,137,58,.07)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.75)",marginBottom:8,fontFamily:"Jost,sans-serif",fontWeight:600}}>✦ Why Order Ours?</div>
                <p style={{fontSize:".76rem",color:"rgba(247,242,234,.6)",lineHeight:1.75,margin:"0 0 10px",fontFamily:"Jost,sans-serif"}}>Measurements are the easy part. What determines results is sourcing — where these herbs came from, how they were dried, and how fresh they are. A saw palmetto berry from an unknown supplier isn't delivering what this recipe promises.</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  {[["🌿 Sourced to a Standard","Organic where possible, specific origins for key herbs"],["⚗️ Consistent Every Batch","No home-blending variability — same ratio, every time"],["💰 More Economical","Buying 5–8 herbs individually costs more and expires faster"],["⏱ Ready Immediately","No sourcing, measuring, or starting over when it doesn't work"]].map(([t,d])=>(
                    <div key={t} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"8px 10px"}}>
                      <div style={{fontSize:".65rem",color:"rgba(196,137,58,.85)",fontFamily:"Jost,sans-serif",marginBottom:2}}>{t}</div>
                      <div style={{fontSize:".62rem",color:"rgba(247,242,234,.4)",fontFamily:"Jost,sans-serif",lineHeight:1.4}}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={()=>setSelectedRecipe(null)}
                style={{width:"100%",background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.3)",color:"rgba(196,137,58,.9)",borderRadius:12,padding:"12px",fontFamily:"Jost,sans-serif",fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",marginBottom:24}}>
                Close Recipe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BLEND DETAIL MODAL */}
      {selected && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:800,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setSelected(null)}>
          <div style={{background:"#1A1A2A",border:"1px solid rgba(196,137,58,.3)",borderRadius:20,maxWidth:520,width:"100%",maxHeight:"90vh",overflowY:"auto",padding:"0 0 24px"}} onClick={e=>e.stopPropagation()}>
            <div style={{height:8,background:`linear-gradient(90deg,${selected.color},rgba(196,137,58,.7))`,borderRadius:"20px 20px 0 0"}} />
            <div style={{padding:"24px 24px 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div>
                  <div style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6,fontFamily:"Jost,sans-serif"}}>{selected.benefit}</div>
                  <div style={{fontFamily:"Playfair Display,serif",fontSize:"1.35rem",fontWeight:700,color:"#F7F2EA"}}>{selected.name}</div>
                  <div style={{fontSize:".82rem",fontStyle:"italic",color:"rgba(247,242,234,.55)",marginTop:4,fontFamily:"Jost,sans-serif"}}>{selected.tagline}</div>
                </div>
                <button onClick={()=>setSelected(null)} style={{background:"rgba(255,255,255,.08)",border:"none",color:"rgba(247,242,234,.6)",borderRadius:"50%",width:34,height:34,fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginLeft:12}}>✕</button>
              </div>
              <p style={{fontSize:".85rem",color:"rgba(247,242,234,.8)",lineHeight:1.75,marginBottom:20,fontFamily:"Jost,sans-serif"}}>{selected.desc}</p>

              <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"16px",marginBottom:16}}>
                <div style={{fontSize:".62rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:10,fontFamily:"Jost,sans-serif"}}>Ingredients</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {selected.ingredients.map(h=>(
                    <span key={h} style={{background:"rgba(196,137,58,.1)",border:"1px solid rgba(196,137,58,.2)",borderRadius:20,padding:"4px 12px",fontSize:".72rem",color:"rgba(247,242,234,.8)",fontFamily:"Jost,sans-serif"}}>{h}</span>
                  ))}
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:4,fontFamily:"Jost,sans-serif"}}>Steep Time</div>
                  <div style={{fontSize:".88rem",color:"#F7F2EA",fontFamily:"Jost,sans-serif"}}>{selected.steepMin} minutes</div>
                </div>
                <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:4,fontFamily:"Jost,sans-serif"}}>Water Temp</div>
                  <div style={{fontSize:".82rem",color:"#F7F2EA",fontFamily:"Jost,sans-serif",lineHeight:1.3}}>{selected.steepTemp}</div>
                </div>
              </div>
              {selected.oz && (
                <div style={{background:"rgba(82,184,130,.06)",border:"1px solid rgba(82,184,130,.18)",borderRadius:10,padding:"12px 14px",marginBottom:16,fontFamily:"Jost,sans-serif",fontSize:".75rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                    <span style={{color:"rgba(255,255,255,.6)"}}>📦 {selected.oz}oz · ~{selected.oz*selected.cupsPerOz} cups · {selected.servingSize}/cup</span>
                    <span style={{background:"rgba(196,137,58,.2)",color:"rgba(196,137,58,.9)",padding:"2px 10px",borderRadius:50,fontWeight:500}}>${(selected.price/(selected.oz*selected.cupsPerOz)).toFixed(2)}/cup</span>
                  </div>
                  <div style={{color:"rgba(255,255,255,.3)",marginTop:4,fontSize:".66rem"}}>vs. $5–$7 energy drink · Real support without synthetic stimulants</div>
                </div>
              )}

              <div style={{background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"16px",marginBottom: selected.warning ? 12 : 20}}>
                <div style={{fontSize:".62rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6,fontFamily:"Jost,sans-serif"}}>Daily Affirmation</div>
                <p style={{fontSize:".82rem",fontStyle:"italic",color:"rgba(247,242,234,.85)",lineHeight:1.7,margin:0,fontFamily:"Playfair Display,serif"}}>"{selected.affirmation}"</p>
              </div>

              {selected.warning && (
                <div style={{background:"rgba(255,180,0,.06)",border:"1px solid rgba(255,180,0,.2)",borderRadius:10,padding:"12px 14px",marginBottom:20}}>
                  <div style={{fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,180,0,.7)",marginBottom:4,fontFamily:"Jost,sans-serif"}}>⚠ Safety Note</div>
                  <p style={{fontSize:".75rem",color:"rgba(255,242,200,.75)",lineHeight:1.65,margin:0,fontFamily:"Jost,sans-serif"}}>{selected.warning}</p>
                </div>
              )}

              {/* WHY ORDER OURS — men's blend modal */}
              <div style={{background:"rgba(196,137,58,.07)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"13px 15px",marginBottom:12}}>
                <div style={{fontSize:".55rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:7,fontFamily:"Jost,sans-serif",fontWeight:600}}>✦ Why Order Ours?</div>
                <p style={{fontSize:".74rem",color:"rgba(247,242,234,.55)",lineHeight:1.7,margin:"0 0 8px",fontFamily:"Jost,sans-serif"}}>These ingredients are easy to list. Getting the right ones — the right grade, origin, and freshness — is where most home blends fall short. Ours are sourced to a specific standard so the blend actually does what it says.</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {["🌿 Sourced to standard","⚗️ Consistent ratio every batch","💰 More economical than buying separate","⏱ Ready, no guesswork"].map(t=>(
                    <span key={t} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(196,137,58,.15)",borderRadius:20,padding:"3px 10px",fontSize:".62rem",color:"rgba(196,137,58,.75)",fontFamily:"Jost,sans-serif"}}>{t}</span>
                  ))}
                </div>
              </div>

              {/* SUPPLEMENT PAIRING — men's blend modal */}
              {(()=>{
                const pairings = getSuppPairing(selected);
                return pairings.length > 0 ? (
                  <div style={{background:"rgba(74,114,80,.07)",border:"1px solid rgba(74,114,80,.2)",borderRadius:12,padding:"13px 15px",marginBottom:16}}>
                    <div style={{fontSize:".55rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(74,114,80,.85)",marginBottom:9,fontFamily:"Jost,sans-serif",fontWeight:600}}>💊 Complete Your Protocol</div>
                    {pairings.map(s=>(
                      <div key={s.name} style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:8,paddingBottom:8,borderBottom:"1px solid rgba(74,114,80,.1)"}}>
                        <span style={{fontSize:"1rem",flexShrink:0}}>{s.emoji}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:".7rem",color:"rgba(74,114,80,.9)",fontWeight:600,fontFamily:"Jost,sans-serif",marginBottom:2}}>{s.name}</div>
                          <div style={{fontSize:".66rem",color:"rgba(247,242,234,.45)",lineHeight:1.5,fontFamily:"Jost,sans-serif",fontWeight:300}}>{s.why}</div>
                        </div>
                        <button onClick={()=>onNav("supplements")} style={{flexShrink:0,background:"rgba(74,114,80,.12)",border:"1px solid rgba(74,114,80,.3)",color:"rgba(74,114,80,.9)",borderRadius:20,padding:"4px 10px",fontSize:".6rem",letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer",fontFamily:"Jost,sans-serif",whiteSpace:"nowrap"}}>
                          See →
                        </button>
                      </div>
                    ))}
                    <div style={{fontSize:".62rem",color:"rgba(247,242,234,.25)",fontStyle:"italic",fontFamily:"Jost,sans-serif"}}>
                      Tea and supplements work together — neither replaces the other.
                    </div>
                  </div>
                ) : null;
              })()}

              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:4}}>
                <div>
                  <div style={{fontFamily:"Playfair Display,serif",fontSize:"1.4rem",color:"rgba(196,137,58,.9)",fontWeight:700}}>${selected.price.toFixed(2)}</div>
                  {selected.oz&&<div style={{fontSize:".65rem",color:"rgba(255,255,255,.4)",marginTop:2}}>~{selected.oz*selected.cupsPerOz} cups · {selected.servingSize}/cup</div>}
                </div>
                <button onClick={()=>{onAddToCart({...selected,emoji:"🍵"});setSelected(null);}}
                  style={{background:"linear-gradient(135deg,rgba(196,137,58,.9),rgba(160,110,40,.9))",border:"none",color:"#0D0D1A",borderRadius:40,padding:"10px 28px",fontSize:".72rem",letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",fontFamily:"Jost,sans-serif",fontWeight:700}}>
                  🛒 Add to Basket — ${selected.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



// ── Auto-rotating hero cards ──────────────────────────────────────────────────
const HERO_NEW_SECTIONS = [
{page:"jelly",   emoji:"🌊", name:"Jelly Kits",      tag:"New · Kit Ships to You",  color:"#1a3a2a", desc:"13 all-natural agar & herb jelly recipes. Kit includes 6 packs + shaker bottle."},
{page:"seamoss", emoji:"🌿", name:"Sea Moss Gel",     tag:"New · Grandmother's Recipe", color:"#0a3a2a", desc:"15 flavored sea moss gel kits. 92 of 102 minerals. Pure Caribbean tradition."},
{page:"men",     emoji:"⚡", name:"Men's Wellness",   tag:"New · 20 Blends",         color:"#1a1a3a", desc:"20 blends built for the male body. Testosterone, heart, stress, prostate & more."},
];

const BLEND_EMOJIS_HERO = {"Morning":"🌅","Evening":"🌙","Seasonal":"🌺","Wellness":"🌿"};

function HeroCards({ onNav, onOpenRecipe }) {
const [indices, setIndices] = useState([0, 3, 7]);
const [newIdx, setNewIdx] = useState(0);
const [hoveredCard, setHoveredCard] = useState(null);
const [paused, setPaused] = useState([false,false,false]);

// Rotate tea cards — staggered so they don't all change at once
useEffect(() => {
  const timers = [0,1,2].map(slot => {
    return setInterval(() => {
      if (!paused[slot]) {
        setIndices(prev => {
          const next = [...prev];
          let n = (next[slot] + 1) % BLENDS.length;
          // avoid duplicates
          while (next.includes(n)) n = (n + 1) % BLENDS.length;
          next[slot] = n;
          return next;
        });
      }
    }, 3500 + slot * 1200);
  });
  return () => timers.forEach(clearInterval);
}, [paused]);

// Rotate "What's New" card
useEffect(() => {
  const t = setInterval(() => setNewIdx(i => (i+1) % HERO_NEW_SECTIONS.length), 3000);
  return () => clearInterval(t);
}, []);

const positions = ["c1","c2","c3"];
const newSection = HERO_NEW_SECTIONS[newIdx];

// Base z-index per slot — front card highest
const BASE_Z = [4, 3, 2];

return (
  <>
    {positions.map((cls, slot) => {
      const blend = BLENDS[indices[slot]];
      const isHov = hoveredCard === slot;
      return (
        <div key={cls} className={`h-card ${cls}`}
          style={{
            cursor:"pointer",
            zIndex: isHov ? 20 : BASE_Z[slot],
            overflow:"visible",
          }}
          onClick={() => onOpenRecipe(`w${indices[slot]}`)}
          onMouseEnter={() => { setHoveredCard(slot); setPaused(p => { const n=[...p]; n[slot]=true; return n; }); }}
          onMouseLeave={() => { setHoveredCard(null); setPaused(p => { const n=[...p]; n[slot]=false; return n; }); }}>
          {/* Inner clipping wrapper — clips the card visuals but not the tooltip */}
          <div style={{width:"100%",height:"100%",borderRadius:20,overflow:"hidden",position:"relative"}}>
            <div className="h-card-inner" style={{background:`linear-gradient(135deg,${blend.color},#1C1A17)`, transition:"all .4s"}}>
              {BLEND_EMOJIS_HERO[blend.occasion] || "🍵"}
            </div>
            <div className="h-card-body">
              <div className="h-card-name" style={{transition:"all .3s"}}>{blend.name}</div>
              <div className="h-card-tag">{blend.occasion}</div>
            </div>
          </div>
          {/* Tooltip — outside the clipping wrapper so it's never hidden */}
          {isHov && (
            <div style={{
              position:"absolute",
              bottom:"calc(100% + 12px)",
              left:"50%",
              transform:"translateX(-50%)",
              width:230,
              background:"#1C1A17",
              borderRadius:14,
              padding:"14px 16px",
              border:"1px solid rgba(196,137,58,.4)",
              boxShadow:"0 16px 48px rgba(0,0,0,.65)",
              zIndex:100,
              pointerEvents:"none",
              whiteSpace:"normal",
            }}>
              <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:5}}>{blend.occasion} · {blend.steepMin} min steep</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"white",marginBottom:5}}>{blend.name}</div>
              <div style={{fontSize:".72rem",color:"rgba(255,255,255,.55)",fontStyle:"italic",marginBottom:10,lineHeight:1.55}}>{blend.tagline}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                {blend.ingredients.slice(0,3).map(h=>(
                  <span key={h} style={{background:"rgba(255,255,255,.08)",borderRadius:20,padding:"2px 9px",fontSize:".6rem",color:"rgba(255,255,255,.6)"}}>{h}</span>
                ))}
              </div>
              <div style={{fontSize:".65rem",color:"rgba(196,137,58,.85)",letterSpacing:".06em",fontWeight:500}}>Click to view full recipe →</div>
              <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",borderLeft:"7px solid transparent",borderRight:"7px solid transparent",borderTop:"7px solid #1C1A17"}}/>
            </div>
          )}
        </div>
      );
    })}

    {/* What's New rotating spotlight card */}
    <div className="h-card c4"
      style={{cursor:"pointer", overflow:"visible", zIndex: hoveredCard === 3 ? 10 : undefined}}
      onClick={() => onNav(newSection.page)}
      onMouseEnter={() => setHoveredCard(3)}
      onMouseLeave={() => setHoveredCard(null)}>
      <div className="h-card-inner" style={{background:`linear-gradient(135deg,${newSection.color},#0a0a0a)`, transition:"all .6s"}}>
        <span style={{fontSize:"1.8rem", transition:"all .4s"}}>{newSection.emoji}</span>
      </div>
      <div className="h-card-body">
        <div className="h-card-name" style={{fontSize:".78rem", transition:"all .4s"}}>{newSection.name}</div>
        <div className="h-card-tag" style={{color:"#c08830", fontSize:".58rem"}}>{newSection.tag}</div>
      </div>
      {/* Pulse dot */}
      <div style={{position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:"#c08830",boxShadow:"0 0 0 3px rgba(192,136,48,.25)",animation:"pulse 2s infinite"}}/>
      {/* Hover preview */}
      {hoveredCard === 3 && (
        <div style={{
          position:"absolute", bottom:"calc(100% + 10px)", left:"50%",
          transform:"translateX(-50%)", width:210,
          background:"#1C1A17", borderRadius:14, padding:"12px 14px",
          border:"1px solid rgba(196,137,58,.35)",
          boxShadow:"0 12px 36px rgba(0,0,0,.5)",
          zIndex:50, pointerEvents:"none",
        }}>
          <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6}}>✦ New Section</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"white",marginBottom:6}}>{newSection.name}</div>
          <div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)",lineHeight:1.6,marginBottom:8}}>{newSection.desc}</div>
          <div style={{fontSize:".65rem",color:"rgba(196,137,58,.8)"}}>Click to explore →</div>
          <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",borderLeft:"7px solid transparent",borderRight:"7px solid transparent",borderTop:"7px solid #1C1A17"}}/>
        </div>
      )}
    </div>
  </>
);
}



export default function ChaiHolistic() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [saveRitualOpen, setSaveRitualOpen] = useState(false);
  const [blendFilter, setBlendFilter] = useState("All");
  const [organFilter, setOrganFilter] = useState("All");
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [timerSec, setTimerSec] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [timerFor, setTimerFor] = useState(null);
  const [notif, setNotif] = useState(null);
  const [search, setSearch] = useState("");
  const [herbPair, setHerbPair] = useState(null);
  // Tea Finder
  const [finderOpen, setFinderOpen] = useState(false);
  const [finderStep, setFinderStep] = useState(0);
  const [finderAnswers, setFinderAnswers] = useState({});
  const [finderResults, setFinderResults] = useState(null);
  // Sip & Seek
  const [ringConfig, setRingConfig] = useState(null);
  const [rcStep, setRcStep] = useState(1);
  const [blendExpanded, setBlendExpanded] = useState(null);
  const [rcFreq, setRcFreq] = useState(null);
  const [rcDesign, setRcDesign] = useState(null);
  const [rcSize, setRcSize] = useState(null);
  const [rcOuterColor, setRcOuterColor] = useState(null);
  const [rcInnerColor, setRcInnerColor] = useState(null);
  const [rcPrayerLink, setRcPrayerLink] = useState(null);
  const [rcLinkUrl, setRcLinkUrl] = useState('');
  const [rcLinkTestShown, setRcLinkTestShown] = useState(false);
  const [rcLinkAttempts, setRcLinkAttempts] = useState(0);
  const [rcOrderConfirmed, setRcOrderConfirmed] = useState(false);
  const [intentionStep, setIntentionStep] = useState(0);
  const [intentionData, setIntentionData] = useState({});
  const [intentionResult, setIntentionResult] = useState(null);
  const [intentionOpen, setIntentionOpen] = useState(false);
  const [welcomeSeen, setWelcomeSeen] = useState(() => {
    try { return localStorage.getItem('chai_welcome_seen') === 'true'; } catch { return false; }
  });
  const [showWelcome, setShowWelcome] = useState(false);
  // Ritual Builder
  const [ritualOpen, setRitualOpen] = useState(false);
  const [ritual, setRitual] = useState({ morning:null, evening:null, extras:[] });
  // Cleanse Tracker
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [activeTracker, setActiveTracker] = useState(null);
  // Tea Library deep-link
  const [teaLibraryBlend, setTeaLibraryBlend] = useState(null);
  const [checkedDays, setCheckedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('chai_cleanse_progress');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  // 2AM mode
  const [twoAM, setTwoAM] = useState(false);

  const timerRef = useRef(null);
  const topRef = useRef(null);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeSecIdx, setActiveSecIdx] = useState(0);
  const [bookPreview, setBookPreview] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [jellyOpen, setJellyOpen] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [timerBlendName, setTimerBlendName] = useState("");
  const [selectedBlend, setSelectedBlend] = useState(null);

  // -- AUDIO SYSTEM ----------------------------------------------------------
  // We create and UNLOCK the AudioContext when user taps "Start Brewing"
  // (must be from a direct user interaction -- browser requirement)
  // Then we schedule the sound to play at timer completion.
  const audioCtxRef = useRef(null);
  const soundScheduledRef = useRef(false);

  const unlockAndScheduleSound = (secondsFromNow) => {
    try {
      // Close any old context
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch {}
      }
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      soundScheduledRef.current = true;

      const playStrike = (startOffset) => {
        [[196, 0, 0.9], [392, 0.01, 0.65], [588, 0.02, 0.38],
         [784, 0.03, 0.22], [980, 0.04, 0.12]].forEach(([freq, delay, gain]) => {
          const osc = ctx.createOscillator();
          const gn = ctx.createGain();
          osc.connect(gn); gn.connect(ctx.destination);
          osc.type = "sine";
          const t = ctx.currentTime + startOffset + delay;
          osc.frequency.setValueAtTime(freq, t);
          gn.gain.setValueAtTime(0.001, t);
          gn.gain.linearRampToValueAtTime(gain, t + 0.06);
          gn.gain.exponentialRampToValueAtTime(0.001, t + 5.2);
          osc.start(t);
          osc.stop(t + 5.5);
        });
      };

      // Schedule 3 bowl strikes at the exact moment the timer ends
      playStrike(secondsFromNow);
      playStrike(secondsFromNow + 2.8);
      playStrike(secondsFromNow + 5.6);
    } catch(e) { console.log("Audio not available:", e); }
  };

  const cancelScheduledSound = () => {
    soundScheduledRef.current = false;
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
      audioCtxRef.current = null;
    }
  };

  // Show back-to-top after scrolling 400px
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const PAGE_SECTIONS = {
    home:    [["↑ Top","sec-hero"],["Features","sec-features"],["Blends","sec-blends"],["Story","sec-story"],["Tea","sec-tea"],["Bundles","sec-bundles"],["Brew Tools","sec-tools-home"],["Rings","sec-rings-home"],["Brewing","sec-brewing"],["FAQ","sec-faq-teaser"]],
    shop:    [["↩ Home","home-page"],["↑ Top","sec-shop-top"],["Blends","sec-shop-blends"],["Cleansing","sec-shop-cleanse"],["Herbs","sec-shop-herbs"],["Bundles","sec-shop-bundles"],["Brew Tools","sec-shop-tools"]],
    recipes: [["↩ Home","home-page"],["↑ Top","sec-rec-top"],["Wellness","sec-rec-wellness"],["Cleansing","sec-rec-cleanse"]],
    rings:   [["↩ Rings","home-page-rings"],["↑ Top","sec-rings-top"],["Collection","sec-rings-grid"],["How It Works","sec-rings-how"],["Frequency","sec-rings-meridian"]],
    faq:         [["↩ Home","home-page"],["↑ Top","sec-faq-top"],["FAQ","sec-faq-content"]],
    men:         [["↩ Home","home-page"],["↑ Top","sec-men-top"],["Blends","sec-men-blends"],["🛡 Prostate","sec-men-prostate"]],
    supplements: [["↩ Home","home-page"],["↑ Top","sec-supp-top"],["All","sec-supp-grid"]],
    ancestral:   [["↩ Home","home-page"],["↑ Top","sec-anc-top"],["Collections","sec-anc-collections"],["Recipes","sec-anc-grid"]],
    mocktails:   [["↩ Home","home-page"],["↑ Top","sec-mkt-top"],["Wellness","sec-mkt-wellness"],["Social","sec-mkt-social"]],
    jelly:       [["↩ Home","home-page"],["↑ Top","sec-jelly-top"],["Kits","sec-jelly-grid"]],
    seamoss:     [["↩ Home","home-page"],["↑ Top","sec-seamoss-top"],["Why Sea Moss","sec-seamoss-why"],["Recipes","sec-seamoss-grid"]],
    "tea-library": [["↩ Home","home-page"],["↑ Top","sec-tl-top"],["Search","sec-tl-search"],["Collection","sec-tl-grid"]],
  };

  useEffect(() => {
    if (!(PAGE_SECTIONS[page]||[]).length) { setActiveSecIdx(0); return; }
    const IDS = (PAGE_SECTIONS[page]||[]).map(s=>s[1]);
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.38;
      let active = 0;
      IDS.forEach((id,i) => { const el = document.getElementById(id); if (el && el.offsetTop <= mid) active = i; });
      setActiveSecIdx(active);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    const anyOpen = finderOpen || ritualOpen || trackerOpen || cartOpen || bookPreview || intentionOpen || showWelcome || !!ringConfig || profileOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [finderOpen, ritualOpen, trackerOpen, cartOpen, bookPreview, intentionOpen, profileOpen]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentHour = now.getHours();
  const isNight = currentHour >= 21 || currentHour < 5;

  const nav = (p, extra) => {
    setPage(p);
    if (extra && extra.filter) setBlendFilter(extra.filter);
    if (extra && extra.blend !== undefined) setTeaLibraryBlend(extra.blend);
    setTimeout(() => topRef.current && topRef.current.scrollIntoView({ behavior:"smooth" }), 20);
  };

  const timerDoneRef = useRef(false);
  const timerEndMsRef = useRef(null);

  // Auto-scroll Tea Finder modal to top when step changes
  useEffect(() => {
    if (finderOpen) {
      const el = document.getElementById('tea-finder-modal');
      if (el) el.scrollTop = 0;
    }
  }, [finderStep, finderOpen]);

  useEffect(() => {
    if (timerOn && timerEndMsRef.current !== null) {
      const tick = () => {
        const remaining = Math.round((timerEndMsRef.current - Date.now()) / 1000);
        if (remaining > 0) {
          setTimerSec(remaining);
          timerRef.current = setTimeout(tick, 250);
        } else {
          setTimerSec(0);
          if (!timerDoneRef.current) {
            timerDoneRef.current = true;
            setTimerOn(false);
            setTimerDone(true);
          }
        }
      };
      timerRef.current = setTimeout(tick, 250);
    }
    return () => clearTimeout(timerRef.current);
  }, [timerOn]);

  const toast = msg => { setNotif(msg); setTimeout(() => setNotif(null), 3200); };

  // --- RITUAL RESTORE FROM URL ----------------------------------------------
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get("ritual");
      if (!encoded) return;
      const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
      if (!decoded || !Array.isArray(decoded.items) || decoded.items.length === 0) return;
      const ageMs = Date.now() - (decoded.savedAt || 0);
      const ageDays = Math.floor(ageMs / 86400000);
      setCart(decoded.items);
      setCartOpen(true);
      setTimeout(() => {
        if (ageDays > 14) {
          toast(`✦ Your ritual has been restored · saved ${ageDays} days ago`);
        } else {
          toast("✦ Your ritual has been restored");
        }
      }, 600);
      // Clean URL without reload
      const clean = window.location.pathname;
      window.history.replaceState({}, "", clean);
    } catch (e) {
      // malformed param — silently ignore
    }
  }, []);
  const addToCart = (item, type="blend") => {
    setCart(p => { const ex = p.find(i=>i.id===item.id); return ex ? p.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i) : [...p,{...item,qty:1,type}]; });
    toast(`✦ ${item.name} added to your Ritual Basket`);
  };
  useEffect(() => { if (typeof window !== "undefined") { window._chaiNav = (p) => nav(p); } });
  const removeItem = id => setCart(p => p.filter(i => i.id !== id));
  const changeQty = (id,d) => setCart(p => p.map(i => i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const cartTotal = cart.reduce((s,i) => s+i.price*i.qty, 0);
  const cartCount = cart.reduce((s,i) => s+i.qty, 0);
  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const startTimer = (r, idx) => {
    timerDoneRef.current = false;
    const secs = r.steepMin * 60;
    timerEndMsRef.current = Date.now() + secs * 1000;
    setTimerFor(idx);
    setTimerSec(secs);
    setTimerOn(true);
    setTimerDone(false);
    setTimerBlendName(r.name || "Your Tea");
    // Schedule sound NOW from this user tap -- only direct interactions allow audio
    // Add 0.6s buffer: slight ramp-in so the bowl plays AT zero, never before
    unlockAndScheduleSound(secs + 0.6);
  };

  const stopTimer = () => {
    timerDoneRef.current = false;
    timerEndMsRef.current = null;
    cancelScheduledSound();
    setTimerOn(false);
    setTimerSec(null);
    setTimerFor(null);
    setTimerDone(false);
  };

  // dismissTimer -- fully clears all timer state in one shot (no double-close)
  const dismissTimer = () => {
    timerDoneRef.current = false;
    timerEndMsRef.current = null;
    cancelScheduledSound();
    setTimerOn(false);
    setTimerSec(null);
    setTimerFor(null);
    setTimerDone(false);
  };

  const scrollPosRef = useRef(0);
  const open2AM = () => {
    scrollPosRef.current = window.scrollY || document.documentElement.scrollTop || 0;
    setTwoAM(true);
  };
  const close2AM = () => {
    setTwoAM(false);
    stopTimer();
    setTimeout(() => window.scrollTo({ top: scrollPosRef.current, behavior: "instant" }), 30);
  };

  const filteredBlends = blendFilter==="All" ? BLENDS : BLENDS.filter(b=>b.occasion===blendFilter);
  const filteredCleansing = organFilter==="All" ? CLEANSING : CLEANSING.filter(c=>c.organ===organFilter);
  const searchedHerbs = search ? HERBS.filter(h=>h.name.toLowerCase().includes(search.toLowerCase())||h.benefit.toLowerCase().includes(search.toLowerCase())) : HERBS;
  const seasonalBlends = (SEASONAL_PICKS[currentMonth]||[]).map(name=>[...BLENDS,...CLEANSING].find(b=>b.name===name)).filter(Boolean);

  // Tea Finder logic
  const runFinder = (answers) => {
    const all = [...BLENDS, ...CLEANSING];
    let scored = all.map(b => {
      let score = 0;
      if (b.energy === answers.energy) score += 3;
      if (b.feeling === answers.feeling) score += 4;
      if (b.time === answers.time || b.time === "anytime") score += 2;
      return { ...b, score };
    });
    scored.sort((a,b) => b.score - a.score);
    setFinderResults(scored.slice(0,3));
  };

  const handleFinderAnswer = (key, val) => {
    const next = { ...finderAnswers, [key]: val };
    setFinderAnswers(next);
    if (finderStep < TEA_FINDER_STEPS.length - 1) {
      setFinderStep(s => s+1);
    } else {
      runFinder(next);
    }
  };

  const resetFinder = () => { setFinderStep(0); setFinderAnswers({}); setFinderResults(null); };

  // Ritual builder add to cart
  const addRitualToCart = () => {
    if (ritual.morning) addToCart({...ritual.morning, emoji:"🌅"});
    if (ritual.evening) addToCart({...ritual.evening, emoji:"🌙"});
    ritual.extras.forEach(e => addToCart({...e, emoji:"✦"}));
    setRitualOpen(false);
    toast("✦ Your daily ritual has been added!");
  };

  // Cleanse tracker
  const toggleDay = (blendId, day) => {
    const key = `${blendId}-${day}`;
    setCheckedDays(p => {
      const next = {...p, [key]: !p[key]};
      try { localStorage.setItem('chai_cleanse_progress', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --ink:#1C1A17;--bark:#3D2B1F;--parch:#F7F2EA;--linen:#EDE7DC;
      --sage:#7A9E7E;--sage-d:#4A7250;--sage-p:#EBF2EC;
      --gold:#C4893A;--gold-p:#F5E6CE;--dust:#D4C9B8;
    }
    html{scroll-behavior:smooth;}
    body{font-family:'Jost',sans-serif;background:var(--parch);color:var(--ink);overflow-x:hidden;}
    ::selection{background:var(--sage-p);}
    body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:999;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");opacity:.38;}

    nav{position:sticky;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:74px;background:rgba(247,242,234,.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--dust);border-radius:22px 22px 0 0;}
    .nav-logo{font-family:'Playfair Display',serif;font-size:1.45rem;color:var(--bark);cursor:pointer;display:flex;align-items:center;gap:8px;letter-spacing:.02em;}
    .nav-logo-img{width:46px;height:46px;border-radius:50%;object-fit:cover;object-position:center top;border:2px solid var(--gold);box-shadow:0 2px 8px rgba(0,0,0,.12);flex-shrink:0;}
    .nav-logo-text{display:flex;flex-direction:column;line-height:1.1;}
    .nav-logo-text span:first-child{font-size:1.35rem;}
    .nav-logo-text span:last-child{font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-family:'Jost',sans-serif;font-weight:400;}
    @keyframes spin{to{transform:rotate(360deg);}}
    .nav-links{display:flex;gap:1rem;flex-wrap:wrap;align-items:center;}
    .nav-lnk{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--bark);opacity:.55;cursor:pointer;transition:all .2s;padding-bottom:2px;border-bottom:1px solid transparent;}
    .nav-lnk:hover,.nav-lnk.on{opacity:1;border-bottom-color:var(--gold);}
    .nav-right{display:flex;align-items:center;gap:10px;}
    .cart-btn{background:var(--bark);color:var(--parch);border:none;padding:8px 18px;font-family:'Jost',sans-serif;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .25s;border-radius:50px;display:flex;align-items:center;gap:7px;}
    .cart-btn:hover{background:var(--sage-d);}
    .cart-badge{background:var(--gold);color:white;width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.56rem;font-weight:500;}

    /* SEASONAL BANNER */
    .season-banner{background:linear-gradient(90deg,var(--sage-d),#3A6B50);padding:10px 2rem;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}
    .season-banner-txt{font-size:.72rem;color:rgba(255,255,255,.85);letter-spacing:.06em;}
    .season-banner-name{font-family:'Playfair Display',serif;font-size:.88rem;color:white;font-style:italic;}
    .btn-season{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);color:white;padding:5px 14px;font-family:'Jost',sans-serif;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border-radius:50px;transition:all .2s;}
    .btn-season:hover{background:rgba(255,255,255,.25);}

    /* 2AM BUTTON */
    .twoam-btn{position:fixed;bottom:28px;right:28px;z-index:400;background:#1C1A17;color:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.15);padding:11px 18px;font-family:'Jost',sans-serif;font-size:.7rem;letter-spacing:.1em;cursor:pointer;border-radius:50px;transition:all .3s;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:pulse2am 3s ease-in-out infinite;}
    .twoam-btn:hover{background:var(--bark);color:white;border-color:rgba(255,255,255,.3);}
    div:has(> .print-tooltip):hover .print-tooltip{opacity:1 !important;}
    @keyframes pulse2am{0%,100%{box-shadow:0 4px 20px rgba(0,0,0,.3)}50%{box-shadow:0 4px 32px rgba(196,137,58,.35)}}

    /* HERO */
    .hero{min-height:620px;position:relative;overflow:hidden;display:flex;align-items:center;background:linear-gradient(140deg,#F0E8D8 0%,#E5DDD0 45%,#D8CEBE 100%);border-radius:0 0 20px 20px;}
    .hero-orb{position:absolute;border-radius:50%;pointer-events:none;}
    .hero-orb.a{width:650px;height:650px;top:-180px;right:-120px;background:radial-gradient(circle,rgba(122,158,126,.18) 0%,transparent 70%);animation:floatA 12s ease-in-out infinite;}
    .hero-orb.b{width:380px;height:380px;bottom:-80px;left:-60px;background:radial-gradient(circle,rgba(196,137,58,.12) 0%,transparent 70%);animation:floatB 9s ease-in-out infinite;}
    @keyframes floatA{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-28px,18px) scale(1.04)}}
    @keyframes floatB{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-22px)}}
    .hero-inner{position:relative;z-index:2;width:100%;max-width:1280px;margin:0 auto;padding:40px 2.5rem 60px;display:grid;grid-template-columns:1.1fr .9fr;gap:4rem;align-items:center;}
    .hero-eye{display:flex;align-items:center;gap:10px;margin-bottom:1.4rem;}
    .hero-eye-line{width:36px;height:1px;background:var(--gold);}
    .hero-eye-txt{font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);}
    .hero-h{font-family:'Playfair Display',serif;font-size:clamp(3rem,5.5vw,5.5rem);font-weight:400;line-height:1.18;color:var(--bark);margin-bottom:1.6rem;letter-spacing:.01em;}
    .hero-h em{font-style:italic;color:var(--sage-d);}
    .hero-h .g{color:var(--gold);}
    .hero-p{font-size:.96rem;font-weight:300;color:#5A5040;line-height:1.8;max-width:420px;margin-bottom:2rem;}
    .hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1.5rem;}
    .btn-main{background:var(--bark);color:var(--parch);border:none;padding:12px 30px;font-family:'Jost',sans-serif;font-size:.72rem;font-weight:400;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .3s;border-radius:50px;}
    .btn-main:hover{background:var(--sage-d);transform:translateY(-2px);box-shadow:0 8px 22px rgba(74,114,80,.3);}
    .btn-ghost{background:transparent;color:var(--bark);border:1.5px solid var(--bark);padding:12px 30px;font-family:'Jost',sans-serif;font-size:.72rem;font-weight:400;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .3s;border-radius:50px;}
    .btn-ghost:hover{border-color:var(--sage-d);color:var(--sage-d);}
    .btn-finder{background:var(--gold);color:white;border:none;padding:12px 30px;font-family:'Jost',sans-serif;font-size:.72rem;font-weight:400;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .3s;border-radius:50px;display:flex;align-items:center;gap:8px;}
    .btn-finder:hover{background:#D4943A;transform:translateY(-2px);}
    .hero-visual{position:relative;height:520px;}
    .h-card{position:absolute;background:white;overflow:visible;box-shadow:0 18px 55px rgba(28,26,23,.13);transition:transform .4s, z-index 0s;border-radius:20px;}
    .h-card .h-card-clip{border-radius:20px;overflow:hidden;width:100%;height:100%;}
    .h-card:hover{transform:rotate(0deg) scale(1.05) !important;z-index:20 !important;}
    .h-card.c1{width:210px;height:290px;top:20px;left:20px;transform:rotate(-4deg);z-index:4;}
    .h-card.c2{width:200px;height:270px;top:55px;left:175px;transform:rotate(3deg);z-index:3;}
    .h-card.c3{width:180px;height:235px;top:195px;left:75px;transform:rotate(-1.5deg);z-index:2;}
    .h-card.c4{width:160px;height:210px;top:240px;left:220px;transform:rotate(2deg);z-index:1;}
    .h-card-inner{width:100%;height:65%;display:flex;align-items:center;justify-content:center;font-size:2.8rem;border-radius:20px 20px 0 0;}
    .h-card-body{padding:11px 13px;}
    .h-card-name{font-family:'Playfair Display',serif;font-size:.88rem;color:var(--bark);}
    .h-card-tag{font-size:.62rem;color:var(--sage);letter-spacing:.1em;text-transform:uppercase;margin-top:2px;}
    .h-badge{position:absolute;bottom:-48px;right:0;background:var(--gold);color:white;padding:10px 14px;font-family:'Playfair Display',serif;font-size:.88rem;font-style:italic;box-shadow:0 6px 22px rgba(196,137,58,.35);z-index:2;border-radius:14px;transition:all .2s;}
    .h-badge:hover{background:var(--bark);box-shadow:0 8px 28px rgba(61,43,31,.4);transform:translateY(-2px);}
    .h-badge small{display:block;font-family:'Jost',sans-serif;font-size:.62rem;font-style:normal;letter-spacing:.1em;opacity:.85;margin-top:2px;}

    /* MARQUEE */
    .mq{background:var(--bark);overflow:hidden;padding:12px 0;cursor:pointer;border-radius:16px;margin:6px 0;} .mq:hover .mq-track{animation-play-state:paused;}
    .mq-track{display:flex;white-space:nowrap;animation:mq 28s linear infinite;}
    .mq-item{font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.6);padding:0 2.5rem;border-right:1px solid rgba(255,255,255,.12);}
    .mq-item span{color:var(--gold);margin-right:6px;}
    @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

    /* SECTIONS */
    .sec{padding:75px 2.5rem;scroll-margin-top:120px;border-radius:20px;margin:6px 0;}
    .sec-linen{background:var(--linen);}
    .sec-dark{background:var(--bark);}
    .sec-sage{background:var(--sage-p);}
    .sec-in{max-width:1280px;margin:0 auto;}
    .sh{margin-bottom:2.8rem;}
    .sh.c{text-align:center;}
    .sh-eye{font-size:.64rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:9px;display:flex;align-items:center;gap:8px;}
    .sh.c .sh-eye{justify-content:center;}
    .sh-eye::before,.sh-eye::after{content:'';height:1px;background:var(--gold);flex:1;max-width:32px;}
    .sh.c .sh-eye::before,.sh.c .sh-eye::after{display:inline-block;}
    .sh-h{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.9rem);font-weight:400;color:var(--bark);line-height:1.15;}
    .sh-h.lt{color:white;}
    .sh-h em{font-style:italic;color:var(--sage-d);}
    .sh-p{font-size:.88rem;font-weight:300;color:#6A5F50;line-height:1.75;margin-top:.65rem;max-width:500px;}
    .sh.c .sh-p{margin:auto;margin-top:.65rem;}
    .sh-p.lt{color:rgba(255,255,255,.58);}

    /* BLEND TILES */
    .b-showcase{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;}
    .b-tile{position:relative;overflow:hidden;cursor:pointer;background:#2A1F15;transition:all .4s;display:flex;flex-direction:column;}
    .b-tile:hover{transform:scale(1.02);z-index:2;}
    .b-tile-exp{grid-column:span 2;transform:none !important;z-index:3;}
    .b-tile-close{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.2);color:white;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:.75rem;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);z-index:4;transition:background .2s;}
    .b-tile-close:hover{background:rgba(0,0,0,.8);}
    .b-tile-recipe{border-top:1px solid rgba(255,255,255,.1);margin-top:10px;padding-top:10px;}
    .b-recipe-desc{font-size:.72rem;color:rgba(255,255,255,.6);line-height:1.6;margin-bottom:10px;font-style:italic;}
    .b-recipe-label{font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;font-weight:500;}
    .b-recipe-list{margin:0 0 10px 0;padding-left:14px;list-style:disc;}
    .b-recipe-list li{font-size:.72rem;color:rgba(255,255,255,.8);margin-bottom:3px;line-height:1.4;}
    .b-recipe-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;}
    .b-recipe-meta{font-size:.6rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.65);padding:3px 8px;border-radius:50px;}
    .b-recipe-warn{font-size:.62rem;color:#E8A87C;background:rgba(232,168,124,.08);border:1px solid rgba(232,168,124,.2);border-radius:8px;padding:7px 10px;line-height:1.5;}
    .b-tile-visual{width:100%;aspect-ratio:4/3;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;transition:all .4s;}
    .b-tile:hover .b-tile-visual{filter:brightness(1.1);}
    .b-tile-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s;}
    .b-tile:hover .b-tile-photo{transform:scale(1.08);}
    .b-tile-occ-badge{font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.9);background:rgba(0,0,0,.45);padding:3px 12px;border-radius:50px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.12);position:relative;z-index:1;}
    .b-tile-body{padding:14px 16px 16px;display:flex;flex-direction:column;flex:1;background:linear-gradient(175deg,#1C1A17 0%,#2A1F15 100%);}
    .b-occ{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:4px;}
    .b-name{font-family:'Playfair Display',serif;font-size:clamp(.88rem,1.4vw,1.1rem);color:white;margin-bottom:3px;line-height:1.2;}
    .b-tag{font-size:.66rem;color:rgba(255,255,255,.42);font-style:italic;margin-bottom:5px;font-weight:300;}
    .b-ben{font-size:.62rem;color:var(--gold);letter-spacing:.07em;margin-bottom:8px;flex:1;}
    .b-foot{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:auto;}
    .b-price{font-family:'Playfair Display',serif;font-size:1.05rem;color:white;}
    .btn-tile{background:var(--gold);color:white;border:none;padding:7px 15px;font-family:'Jost',sans-serif;font-size:.64rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:50px;white-space:nowrap;}
    .btn-tile:hover{background:white;color:var(--bark);}
    /* PRODUCT CARD VISUAL HEADER */
    .pcard-visual{width:100%;height:130px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:20px 20px 0 0;position:relative;overflow:hidden;transition:all .3s;}
    .pcard:hover .pcard-visual{filter:brightness(1.08);}
    .pcard-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s;}
    .pcard:hover .pcard-photo{transform:scale(1.08);}
    .pcard-visual-occ{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-size:.52rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.9);background:rgba(0,0,0,.45);padding:2px 10px;border-radius:50px;white-space:nowrap;backdrop-filter:blur(4px);z-index:1;}

    /* PILLS */
    .pills{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:2.2rem;}
    .pill{padding:7px 18px;font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;font-weight:400;cursor:pointer;border:1.5px solid var(--dust);background:white;color:#7A6E5A;transition:all .2s;font-family:'Jost',sans-serif;border-radius:50px;}
    .pill.on{background:var(--bark);color:white;border-color:var(--bark);}
    .pill:hover:not(.on){border-color:var(--sage);color:var(--sage-d);background:var(--sage-p);}
    .pill.cleanse-pill.on{background:#8B3A2A;border-color:#8B3A2A;}

    /* PRODUCT CARDS */
    .pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:16px;}
    .pcard{background:white;border:1px solid var(--dust);overflow:hidden;transition:all .3s;border-radius:20px;}
    .pcard:hover{box-shadow:0 14px 44px rgba(28,26,23,.1);transform:translateY(-4px);}
    .pcard-stripe{height:5px;border-radius:20px 20px 0 0;}
    .pcard-body{padding:18px;}
    .pcard-occ{font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:var(--sage);margin-bottom:4px;}
    .pcard-name{font-family:'Playfair Display',serif;font-size:1.12rem;color:var(--bark);margin-bottom:3px;}
    .pcard-tag{font-size:.74rem;font-style:italic;color:#8A7A6A;margin-bottom:8px;font-weight:300;}
    .pcard-desc{font-size:.78rem;color:#6A5F50;line-height:1.6;margin-bottom:10px;font-weight:300;}
    .pcard-ingr{font-size:.66rem;color:#8A7A6A;margin-bottom:10px;line-height:1.5;}
    .pcard-ingr strong{font-weight:500;letter-spacing:.08em;text-transform:uppercase;font-size:.58rem;color:#5A5040;display:block;margin-bottom:2px;}
    .pcard-benefit{font-size:.66rem;color:var(--gold);letter-spacing:.07em;margin-bottom:10px;}
    .pcard-foot{display:flex;justify-content:space-between;align-items:center;}
    .pcard-price{font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--bark);}
    .btn-add{background:var(--bark);color:white;border:none;padding:8px 15px;font-family:'Jost',sans-serif;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:50px;}
    .btn-add:hover{background:var(--sage-d);}
    .pcard{cursor:pointer;}

    /* BLEND DETAIL MODAL */
    .bm-ov{position:fixed;inset:0;background:rgba(18,14,10,.72);z-index:900;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(8px);}
    .bm{background:var(--parch);max-width:660px;width:100%;max-height:92vh;overflow-y:auto;border-radius:28px;box-shadow:0 32px 100px rgba(0,0,0,.35);position:relative;}
    .bm-hero{width:100%;height:200px;position:relative;overflow:hidden;border-radius:28px 28px 0 0;flex-shrink:0;}
    .bm-hero-img{width:100%;height:100%;object-fit:cover;}
    .bm-hero-grad{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,.55) 100%);}
    .bm-hero-occ{position:absolute;top:16px;left:18px;font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.9);background:rgba(0,0,0,.45);padding:3px 12px;border-radius:50px;backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.15);}
    .bm-close{position:absolute;top:14px;right:14px;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.25);color:white;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);transition:all .2s;z-index:2;}
    .bm-close:hover{background:rgba(0,0,0,.75);}
    .bm-stripe{height:5px;}
    .bm-body{padding:22px 26px 28px;}
    .bm-name{font-family:'Playfair Display',serif;font-size:1.7rem;color:var(--bark);margin-bottom:4px;line-height:1.2;}
    .bm-tagline{font-size:.82rem;font-style:italic;color:#8A7A6A;margin-bottom:14px;font-weight:300;}
    .bm-desc{font-size:.84rem;color:#5A5040;line-height:1.75;margin-bottom:18px;font-weight:300;}
    .bm-section-lbl{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--sage-d);margin-bottom:7px;}
    .bm-ingr-wrap{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px;}
    .bm-ingr-chip{font-size:.7rem;background:var(--sage-p);color:var(--sage-d);padding:5px 12px;border-radius:50px;border:1px solid rgba(74,114,80,.18);}
    .bm-benefit{font-size:.74rem;color:var(--gold);letter-spacing:.08em;margin-bottom:18px;}
    .bm-brew{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}
    .bm-brew-tile{background:white;border:1px solid var(--dust);border-radius:14px;padding:12px 14px;}
    .bm-brew-lbl{font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:#9A8A7A;margin-bottom:4px;}
    .bm-brew-val{font-size:.82rem;color:var(--bark);font-weight:500;}
    .bm-value{background:var(--sage-p);border:1px solid rgba(74,114,80,.15);border-radius:14px;padding:10px 14px;font-size:.72rem;color:var(--sage-d);margin-bottom:18px;display:flex;align-items:center;gap:8px;}
    .bm-warn{background:#FFF8F6;border:1px solid #F0C0B0;border-radius:14px;padding:12px 14px;font-size:.74rem;color:#7A3020;line-height:1.6;margin-bottom:18px;font-weight:300;}
    .bm-warn strong{color:#8B3A2A;font-weight:600;display:block;margin-bottom:3px;}
    .bm-foot{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding-top:4px;border-top:1px solid var(--dust);margin-top:4px;}
    .bm-price{font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--bark);}
    .bm-cup-note{font-size:.64rem;color:#9A8A7A;font-weight:300;line-height:1.4;}
    @media(max-width:600px){
      .bm{max-height:95vh;border-radius:24px 24px 0 0;position:fixed;bottom:0;left:0;right:0;width:100%;max-width:100%;}
      .bm-ov{align-items:flex-end;padding:0;}
      .bm-hero{height:160px;border-radius:24px 24px 0 0;}
      .bm-brew{grid-template-columns:1fr 1fr;}
      .bm-name{font-size:1.4rem;}
    }

    /* CLEANSE CARDS */
    .cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px;}
    .ccard{background:white;border:1px solid var(--dust);border-radius:20px;overflow:hidden;transition:all .3s;}
    .ccard:hover{box-shadow:0 14px 44px rgba(28,26,23,.1);transform:translateY(-3px);}
    .ccard-top{padding:16px 18px 12px;background:linear-gradient(135deg,#3D2B1F,#2A1F15);border-radius:20px 20px 0 0;}
    .ccard-organ{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:5px;opacity:.85;}
    .ccard-name{font-family:'Playfair Display',serif;font-size:1.05rem;color:white;margin-bottom:2px;}
    .ccard-tag{font-size:.72rem;font-style:italic;color:rgba(255,255,255,.52);font-weight:300;}
    .ccard-body{padding:16px 18px;}
    .ccard-desc{font-size:.78rem;color:#6A5F50;line-height:1.6;margin-bottom:9px;font-weight:300;}
    .ccard-protocol{font-size:.72rem;color:#5A5040;background:var(--sage-p);padding:9px 11px;border-radius:10px;line-height:1.5;margin-bottom:10px;}
    .ccard-protocol strong{display:block;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sage-d);margin-bottom:2px;}
    .ccard-ingr{font-size:.66rem;color:#8A7A6A;margin-bottom:12px;}
    .ccard-ingr strong{font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:#5A5040;display:block;margin-bottom:2px;}
    .ccard-foot{display:flex;justify-content:space-between;align-items:center;}
    .ccard-price{font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--bark);}
    .btn-add-c{background:#8B3A2A;color:white;border:none;padding:7px 14px;font-family:'Jost',sans-serif;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:50px;}
    .btn-add-c:hover{background:#A04A3A;}
    .btn-track{background:none;border:1.5px solid #8B3A2A;color:#8B3A2A;padding:7px 14px;font-family:'Jost',sans-serif;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:50px;}
    .btn-track:hover{background:#8B3A2A;color:white;}

    /* HERBS */
    .hgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;}
    .hcard{background:white;border:1px solid var(--dust);border-radius:18px;transition:all .25s;cursor:pointer;overflow:hidden;}
    .hcard:hover{box-shadow:0 8px 28px rgba(28,26,23,.08);transform:translateY(-2px);border-color:var(--sage);}
    .hcard.paired{border-color:var(--gold);background:var(--gold-p);}
    .hcard-img{width:100%;height:140px;overflow:hidden;border-radius:12px 12px 0 0;}
    .hcard-img img{transition:transform .4s;}
    .hcard:hover .hcard-img img{transform:scale(1.05);}
    .hcard-name{font-family:'Playfair Display',serif;font-size:.9rem;color:var(--bark);margin-bottom:3px;padding:12px 14px 0;}
    .hcard-benefit{font-size:.66rem;color:#8A7A6A;line-height:1.45;margin-bottom:10px;font-weight:300;padding:0 14px;}
    .hcard-pairs{font-size:.62rem;color:var(--gold);margin-bottom:10px;font-weight:500;padding:0 14px;}
    .hcard-foot{display:flex;justify-content:space-between;align-items:center;padding:0 14px 14px;}
    .hcard-price{font-size:.85rem;color:var(--bark);}
    .btn-herb{background:none;border:1.5px solid var(--sage);color:var(--sage-d);padding:4px 12px;font-size:.64rem;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;transition:all .2s;border-radius:50px;}
    .btn-herb:hover{background:var(--sage-d);color:white;border-color:var(--sage-d);}

    /* SEARCH */
    .search-wrap{max-width:380px;margin:0 auto 1.8rem;position:relative;}
    .search-input{width:100%;padding:10px 18px 10px 40px;border:1.5px solid var(--dust);background:white;font-family:'Jost',sans-serif;font-size:.82rem;color:var(--bark);outline:none;border-radius:50px;transition:border-color .2s;}
    .search-input:focus{border-color:var(--sage);}
    .search-icon{position:absolute;left:15px;top:50%;transform:translateY(-50%);font-size:.85rem;opacity:.4;pointer-events:none;}

    /* BUNDLES */
    .bgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:20px;}
    .bcard{border:1px solid var(--dust);background:white;overflow:hidden;border-radius:20px;transition:all .3s;}
    .bcard:hover{box-shadow:0 18px 55px rgba(28,26,23,.1);transform:translateY(-4px);}
    .bcard-top{background:linear-gradient(135deg,var(--bark) 0%,#2A1F15 100%);padding:24px;border-radius:20px 20px 0 0;position:relative;overflow:hidden;}
    .bcard-top::after{content:'✦';position:absolute;right:-8px;top:-18px;font-size:7rem;color:rgba(255,255,255,.03);pointer-events:none;}
    .bcard-badge{display:inline-block;background:var(--gold);color:white;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;padding:3px 12px;margin-bottom:10px;border-radius:50px;}
    .bcard-name{font-family:'Playfair Display',serif;font-size:1.25rem;color:white;margin-bottom:4px;}
    .bcard-desc{font-size:.78rem;color:rgba(255,255,255,.55);font-weight:300;line-height:1.6;}
    .bcard-body{padding:20px;}
    .bcard-lbl{font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;color:#8A7A6A;margin-bottom:7px;}
    .bcard-list{list-style:none;margin-bottom:16px;}
    .bcard-list li{font-size:.78rem;color:#5A5040;padding:3px 0;border-bottom:1px solid var(--dust);display:flex;align-items:center;gap:7px;font-weight:300;}
    .bcard-list li::before{content:'--';color:var(--sage);font-size:.66rem;}
    .bcard-foot{display:flex;justify-content:space-between;align-items:flex-end;}
    .bcard-price{font-family:'Playfair Display',serif;font-size:1.45rem;color:var(--bark);}
    .bcard-save{font-size:.68rem;color:var(--sage-d);}
    .btn-bundle{background:var(--bark);color:white;border:none;padding:9px 18px;font-family:'Jost',sans-serif;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:50px;}
    .btn-bundle:hover{background:var(--sage-d);}

    /* BREW TOOLS */
    .tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}
    .tcard{background:white;border:1px solid var(--dust);border-radius:20px;overflow:hidden;transition:all .3s;display:flex;flex-direction:column;}
    .tcard:hover{box-shadow:0 16px 50px rgba(28,26,23,.1);transform:translateY(-4px);}
    .tcard-visual{width:100%;height:180px;position:relative;overflow:hidden;border-radius:20px 20px 0 0;}
    .tcard-photo{width:100%;height:100%;object-fit:cover;transition:transform .5s;}
    .tcard:hover .tcard-photo{transform:scale(1.07);}
    .tcard-badge{position:absolute;top:12px;left:12px;background:rgba(28,26,23,.72);color:rgba(255,255,255,.92);font-size:.52rem;letter-spacing:.16em;text-transform:uppercase;padding:3px 11px;border-radius:50px;backdrop-filter:blur(6px);}
    .tcard-emoji{position:absolute;bottom:10px;right:12px;font-size:1.4rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3));}
    .tcard-body{padding:18px;flex:1;display:flex;flex-direction:column;}
    .tcard-material{font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:var(--sage-d);margin-bottom:5px;}
    .tcard-name{font-family:'Playfair Display',serif;font-size:1.08rem;color:var(--bark);margin-bottom:3px;line-height:1.25;}
    .tcard-tagline{font-size:.74rem;font-style:italic;color:#8A7A6A;margin-bottom:10px;font-weight:300;}
    .tcard-desc{font-size:.78rem;color:#6A5F50;line-height:1.65;margin-bottom:12px;font-weight:300;flex:1;}
    .tcard-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
    .tcard-chip{font-size:.6rem;letter-spacing:.08em;background:var(--sage-p);color:var(--sage-d);padding:3px 10px;border-radius:50px;border:1px solid rgba(74,114,80,.15);}
    .tcard-care{font-size:.64rem;color:#9A8A7A;font-style:italic;margin-bottom:14px;padding:8px 10px;background:#FAF8F5;border-radius:8px;border-left:2px solid var(--gold);line-height:1.5;}
    .tcard-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;}
    .tcard-price{font-family:'Playfair Display',serif;font-size:1.12rem;color:var(--bark);}
    .btn-tool{background:var(--bark);color:white;border:none;padding:8px 16px;font-family:'Jost',sans-serif;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:50px;}
    .btn-tool:hover{background:var(--sage-d);}
    .tools-intro{max-width:560px;margin:0 auto 2.5rem;text-align:center;}
    .tools-intro-p{font-size:.88rem;color:#6A5F50;line-height:1.8;font-weight:300;}

    /* PHILOSOPHY */
    .philo{display:grid;grid-template-columns:1fr 1fr;min-height:440px;}
    .philo-vis{background:linear-gradient(160deg,var(--sage-d) 0%,#2D4A2D 100%);display:flex;align-items:center;justify-content:center;padding:60px;position:relative;overflow:hidden;}
    .philo-vis::before,.philo-vis::after{content:'';position:absolute;border:1px solid rgba(255,255,255,.07);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);}
    .philo-vis::before{width:380px;height:380px;}
    .philo-vis::after{width:220px;height:220px;}
    .philo-quote{font-family:'Playfair Display',serif;font-size:clamp(1.35rem,2.2vw,1.9rem);font-style:italic;color:white;line-height:1.45;text-align:center;position:relative;z-index:2;}
    .philo-txt{background:var(--linen);padding:55px 45px;display:flex;flex-direction:column;justify-content:center;}
    .philo-p{font-size:.88rem;font-weight:300;color:#5A5040;line-height:1.8;margin-bottom:1rem;}
    .philo-sig{font-family:'Playfair Display',serif;font-size:1rem;font-style:italic;color:var(--gold);}

    /* RECIPES */
    .rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:10px;}
    .rcard{border:1px solid var(--dust);background:white;overflow:hidden;cursor:pointer;transition:all .25s;border-radius:16px;position:relative;}
    .rcard:hover{box-shadow:0 6px 22px rgba(28,26,23,.1);border-color:var(--sage);transform:translateY(-2px);}
    .rcard.open{border-color:var(--sage-d);box-shadow:0 10px 32px rgba(74,114,80,.14);transform:none;}
    .rcard-head{padding:14px 14px 10px;display:flex;gap:10px;align-items:flex-start;}
    .rcard-icon{width:36px;height:36px;border-radius:10px;background:var(--sage-p);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
    .rcard-name{font-family:'Playfair Display',serif;font-size:.88rem;color:var(--bark);line-height:1.25;}
    .rcard-tag-sm{font-size:.58rem;color:var(--sage);letter-spacing:.08em;text-transform:uppercase;margin-top:2px;}
    .rcard-meta{display:flex;gap:5px;flex-wrap:wrap;padding:0 14px 10px;}
    .rcard-hover-desc{display:none;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);width:220px;background:#1C1A17;color:rgba(255,255,255,.85);font-size:.72rem;line-height:1.6;padding:10px 14px;border-radius:12px;pointer-events:none;z-index:200;font-family:'Jost',sans-serif;border:1px solid rgba(196,137,58,.3);font-weight:300;box-shadow:0 8px 28px rgba(0,0,0,.4);}
    .rcard-hover-desc::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#1C1A17;}
    .rcard:hover .rcard-hover-desc{display:block;}
    .rcard-expand-arrow{position:absolute;top:12px;right:12px;width:20px;height:20px;border-radius:50%;background:var(--sage-p);display:flex;align-items:center;justify-content:center;font-size:.6rem;color:var(--sage-d);transition:transform .25s;}
    .rcard.open .rcard-expand-arrow{transform:rotate(180deg);background:var(--sage-d);color:white;}
    .rcard-expand{max-height:0;overflow:hidden;transition:max-height .4s ease;background:var(--linen);border-radius:0 0 16px 16px;}
    .rcard.open .rcard-expand{max-height:1100px;}
    .rsteps{padding:16px 18px;}
    .timer-row{display:flex;align-items:center;gap:11px;padding:11px 14px;background:white;border-top:1px solid var(--dust);border-radius:0 0 14px 14px;}
    .timer-face{font-family:'Playfair Display',serif;font-size:1.7rem;color:var(--bark);min-width:62px;}
    .btn-t{border:none;padding:7px 15px;font-family:'Jost',sans-serif;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border-radius:50px;transition:all .2s;}
    .btn-t.go{background:var(--sage-d);color:white;}
    .btn-t.stop{background:var(--gold);color:white;}
    .btn-t.rst{background:none;border:1.5px solid var(--dust);color:#8A7A6A;}

    /* RINGS */
    .ringsgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;}
    .rng{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);padding:32px 28px;border-radius:24px;transition:all .35s;position:relative;overflow:hidden;}
    .rng::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(196,137,58,.6),transparent);transform:scaleX(0);transition:transform .4s;}
    .rng:hover::before{transform:scaleX(1);}
    .rng:hover{background:rgba(255,255,255,.09);}
    .rng-sym{font-size:2.8rem;margin-bottom:16px;opacity:.65;color:white;}
    .rng-tag{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;opacity:.8;}
    .rng-name{font-family:'Playfair Display',serif;font-size:1.4rem;color:white;margin-bottom:8px;}
    .rng-desc{font-size:.8rem;color:rgba(255,255,255,.52);line-height:1.6;margin-bottom:11px;font-weight:300;}
    .rng-mat{font-size:.66rem;letter-spacing:.1em;color:rgba(196,137,58,.8);margin-bottom:18px;}
    .rng-foot{display:flex;justify-content:space-between;align-items:center;}
    .rng-price{font-family:'Playfair Display',serif;font-size:1.4rem;color:white;}
    .btn-rng{background:none;border:1.5px solid rgba(255,255,255,.28);color:rgba(255,255,255,.82);padding:7px 16px;font-family:'Jost',sans-serif;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .25s;border-radius:50px;}
    .btn-rng:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.5);}

    /* BOOK CTA */
    .book-cta{background:var(--bark);padding:65px 2.5rem;text-align:center;position:relative;overflow:hidden;}
    .book-cta::before{content:'✦';position:absolute;font-size:18rem;color:rgba(255,255,255,.02);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
    .book-cta h2{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.7rem);color:white;font-weight:400;margin-bottom:10px;}
    .book-cta h2 em{color:var(--gold);font-style:italic;}
    .book-cta p{font-size:.88rem;color:rgba(255,255,255,.5);font-weight:300;margin-bottom:1.8rem;max-width:420px;margin-left:auto;margin-right:auto;line-height:1.7;}
    .btn-book{background:var(--gold);color:white;border:none;padding:13px 38px;font-family:'Jost',sans-serif;font-size:.73rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .3s;border-radius:50px;}
    .btn-book:hover{background:#D4943A;transform:translateY(-2px);}

    /* MODALS */
    .modal-ov{display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(28,26,23,.6);z-index:800;backdrop-filter:blur(6px);padding:1rem;}
    .modal-open{overflow:hidden;}
    .modal{background:var(--parch);max-width:620px;width:100%;max-height:90vh;overflow-y:auto;border-radius:24px;box-shadow:0 24px 80px rgba(28,26,23,.3);}
    .modal-head{padding:26px 28px 18px;border-bottom:1px solid var(--dust);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:var(--parch);border-radius:24px 24px 0 0;z-index:2;}
    .modal-title{font-family:'Playfair Display',serif;font-size:1.35rem;color:var(--bark);}
    .modal-close{background:none;border:1.5px solid var(--dust);width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:.9rem;color:var(--bark);display:flex;align-items:center;justify-content:center;transition:all .2s;}
    .modal-close:hover{background:var(--bark);color:white;border-color:var(--bark);}
    .modal-body{padding:24px 28px;}

    /* TEA FINDER */
    .finder-q{font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--bark);margin-bottom:1.4rem;line-height:1.3;}
    .finder-opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;}
    .finder-opt{background:white;border:1.5px solid var(--dust);padding:14px;border-radius:16px;cursor:pointer;transition:all .2s;text-align:center;}
    .finder-opt:hover{border-color:var(--sage-d);background:var(--sage-p);}
    .finder-opt-e{font-size:1.6rem;margin-bottom:6px;}
    .finder-opt-l{font-size:.78rem;color:var(--bark);font-weight:400;}
    .finder-result{background:white;border:1.5px solid var(--dust);border-radius:16px;padding:18px;margin-bottom:12px;display:flex;gap:14px;align-items:flex-start;}
    .finder-result-rank{width:28px;height:28px;background:var(--gold);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:600;flex-shrink:0;}
    .finder-result-name{font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--bark);margin-bottom:3px;}
    .finder-result-benefit{font-size:.7rem;color:var(--gold);margin-bottom:6px;}
    .finder-result-desc{font-size:.78rem;color:#6A5F50;line-height:1.55;font-weight:300;}
    .finder-progress{display:flex;gap:6px;margin-bottom:1.6rem;}
    .finder-dot{width:8px;height:8px;border-radius:50%;background:var(--dust);transition:all .3s;}
    .finder-dot.done{background:var(--gold);}

    /* RITUAL BUILDER */
    .ritual-section{margin-bottom:1.8rem;}
    .ritual-section-h{font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;color:var(--sage-d);margin-bottom:10px;font-weight:500;}
    .ritual-opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;max-height:220px;overflow-y:auto;}
    .ritual-opt{background:white;border:1.5px solid var(--dust);padding:10px 12px;border-radius:12px;cursor:pointer;transition:all .2s;}
    .ritual-opt:hover{border-color:var(--sage);}
    .ritual-opt.selected{border-color:var(--sage-d);background:var(--sage-p);}
    .ritual-opt-name{font-family:'Playfair Display',serif;font-size:.9rem;color:var(--bark);margin-bottom:2px;}
    .ritual-opt-tag{font-size:.65rem;color:var(--sage);letter-spacing:.08em;}
    .ritual-summary{background:var(--linen);border-radius:16px;padding:16px;margin-bottom:1.5rem;}
    .ritual-summary-h{font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:#8A7A6A;margin-bottom:10px;}
    .ritual-item{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--dust);}
    .ritual-item:last-child{border-bottom:none;}
    .ritual-item-name{font-size:.82rem;color:var(--bark);}
    .ritual-total{font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--bark);margin-top:10px;text-align:right;}

    /* CLEANSE TRACKER */
    .tracker-select{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin-bottom:1.5rem;}
    .tracker-opt{background:white;border:1.5px solid var(--dust);padding:12px;border-radius:12px;cursor:pointer;transition:all .2s;}
    .tracker-opt:hover{border-color:#8B3A2A;}
    .tracker-opt.on{border-color:#8B3A2A;background:#FFF5F3;}
    .tracker-opt-name{font-family:'Playfair Display',serif;font-size:.88rem;color:var(--bark);}
    .tracker-opt-days{font-size:.66rem;color:#8B3A2A;margin-top:2px;}
    .day-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:1.2rem;}
    .day-cell{aspect-ratio:1;border:1.5px solid var(--dust);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:.72rem;cursor:pointer;transition:all .2s;color:#8A7A6A;font-family:'Jost',sans-serif;}
    .day-cell:hover{border-color:#8B3A2A;}
    .day-cell.checked{background:#8B3A2A;border-color:#8B3A2A;color:white;}
    .tracker-progress-bar{height:8px;background:var(--dust);border-radius:50px;overflow:hidden;margin-bottom:6px;}
    .tracker-progress-fill{height:100%;background:linear-gradient(90deg,#8B3A2A,var(--gold));border-radius:50px;transition:width .4s;}

    /* CART */
    .overlay{position:fixed;inset:0;background:rgba(28,26,23,.5);z-index:800;backdrop-filter:blur(4px);}
    .drawer{position:fixed;top:0;right:0;height:100vh;width:min(420px,100vw);background:var(--parch);z-index:900;display:flex;flex-direction:column;box-shadow:-14px 0 55px rgba(28,26,23,.2);border-radius:24px 0 0 24px;}
    .drw-head{padding:24px 24px 16px;border-bottom:1px solid var(--dust);display:flex;justify-content:space-between;align-items:center;}
    .drw-title{font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--bark);}
    .drw-close{background:none;border:1.5px solid var(--dust);width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:.9rem;color:var(--bark);display:flex;align-items:center;justify-content:center;transition:all .2s;}
    .drw-close:hover{background:var(--bark);color:white;border-color:var(--bark);}
    .drw-items{flex:1;overflow-y:auto;padding:16px 24px;display:flex;flex-direction:column;}
    .drw-cart-list{margin-bottom:4px;}
    .ditem{display:flex;gap:12px;padding:13px 0;border-bottom:1px solid var(--dust);}
    .ditem-icon{width:52px;height:52px;border-radius:12px;background:var(--linen);border:1px solid var(--dust);display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;}
    .ditem-info{flex:1;}
    .ditem-name{font-family:'Playfair Display',serif;font-size:.9rem;color:var(--bark);margin-bottom:2px;}
    .ditem-price{font-size:.76rem;color:#6A5F50;margin-bottom:7px;}
    .ditem-ctrl{display:flex;align-items:center;gap:8px;}
    .qty-b{width:24px;height:24px;border:1.5px solid var(--dust);border-radius:50%;background:none;cursor:pointer;font-size:.8rem;display:flex;align-items:center;justify-content:center;transition:all .15s;}
    .qty-b:hover{border-color:var(--bark);}
    .qty-v{font-size:.86rem;min-width:16px;text-align:center;}
    .rm-btn{background:none;border:none;color:#AA9A8A;font-size:.68rem;cursor:pointer;text-decoration:underline;}
    .cart-sugg{background:var(--sage-p);border-radius:14px;margin-top:12px;padding:12px 16px;max-height:140px;overflow-y:auto;flex-shrink:0;}
    .sugg-h{font-size:.63rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--sage-d);margin-bottom:8px;}
    .sugg-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #C8DEC8;}
    .sugg-row:last-child{border-bottom:none;}
    .sugg-name{font-size:.78rem;color:var(--bark);}
    .sugg-save{font-size:.65rem;color:var(--sage-d);}
    .btn-sugg{background:var(--sage-d);color:white;border:none;padding:5px 13px;font-size:.63rem;font-family:'Jost',sans-serif;cursor:pointer;border-radius:50px;transition:all .2s;}
    .btn-sugg:hover{background:var(--bark);}
    .cart-ritual{margin-top:12px;flex-shrink:0;}
    .drw-foot{padding:16px 24px;border-top:1px solid var(--dust);flex-shrink:0;}
    .d-sub{display:flex;justify-content:space-between;margin-bottom:12px;}
    .d-sub-l{font-size:.76rem;color:#6A5F50;letter-spacing:.06em;text-transform:uppercase;}
    .d-sub-r{font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--bark);}
    .btn-chk{width:100%;background:var(--bark);color:white;border:none;padding:14px;font-family:'Jost',sans-serif;font-size:.73rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:50px;}
    .btn-chk:hover{background:var(--sage-d);}
    .btn-chk:disabled{opacity:.4;cursor:default;}
    .empty{text-align:center;padding:3rem 2rem;}
    .empty-icon{font-size:2.6rem;margin-bottom:.8rem;opacity:.45;}
    .empty-msg{font-family:'Playfair Display',serif;font-size:1rem;color:var(--bark);}
    .empty-sub{font-size:.78rem;color:#8A7A6A;font-weight:300;margin-top:.3rem;}

    /* TOAST */
    /* LARGE TIMER OVERLAY */
    .timer-overlay{position:fixed;inset:0;background:rgba(10,10,10,.97);z-index:700;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;}
    .timer-overlay-name{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,3vw,1.8rem);color:rgba(255,255,255,.5);font-style:italic;margin-bottom:.6rem;text-align:center;}
    .timer-overlay-face{font-family:'Playfair Display',serif;font-size:clamp(5rem,20vw,10rem);color:white;line-height:1;margin-bottom:.4rem;letter-spacing:.04em;font-weight:300;}
    .timer-overlay-face.done{color:var(--gold);animation:timerPulse 1s ease-in-out 3;}
    @keyframes timerPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}

    /* STEAMING CUP ANIMATION */
    .tea-cup-wrap{position:relative;width:120px;height:120px;margin:0 auto 1.2rem;display:flex;align-items:flex-end;justify-content:center;}
    .tea-cup{font-size:3.8rem;line-height:1;filter:drop-shadow(0 0 18px rgba(196,137,58,.35));animation:cupGlow 3s ease-in-out infinite;}
    @keyframes cupGlow{0%,100%{filter:drop-shadow(0 0 14px rgba(196,137,58,.3))}50%{filter:drop-shadow(0 0 28px rgba(196,137,58,.6))}}
    .steam{position:absolute;bottom:62px;display:flex;gap:10px;left:50%;transform:translateX(-50%);}
    .steam-line{width:3px;border-radius:3px;background:linear-gradient(to top,rgba(255,255,255,.5),transparent);animation:steamRise 2.4s ease-in-out infinite;}
    .steam-line:nth-child(1){height:28px;animation-delay:0s;animation-duration:2.2s;}
    .steam-line:nth-child(2){height:38px;animation-delay:.4s;animation-duration:2.6s;}
    .steam-line:nth-child(3){height:24px;animation-delay:.8s;animation-duration:2.1s;}
    .steam-line:nth-child(4){height:34px;animation-delay:1.2s;animation-duration:2.8s;}
    @keyframes steamRise{0%{transform:translateY(0) scaleX(1);opacity:0}20%{opacity:.7}80%{opacity:.3}100%{transform:translateY(-28px) scaleX(1.6);opacity:0}}

    /* PULSING STEEPING LABEL */
    .steeping-label{font-size:.78rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:1.6rem;animation:steepPulse 2s ease-in-out infinite;}
    .paused-label{font-size:.78rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:1.6rem;}
    @keyframes steepPulse{0%,100%{opacity:.45;letter-spacing:.28em}50%{opacity:.9;letter-spacing:.34em;color:rgba(196,137,58,.85)}}

    .timer-overlay-keepopen{background:rgba(196,137,58,.12);border:1px solid rgba(196,137,58,.3);border-radius:16px;padding:12px 20px;margin-bottom:1.6rem;text-align:center;max-width:340px;}
    .timer-overlay-keepopen strong{display:block;color:var(--gold);font-size:.78rem;letter-spacing:.06em;margin-bottom:3px;}
    .timer-overlay-keepopen span{font-size:.7rem;color:rgba(255,255,255,.38);font-weight:300;line-height:1.5;}
    .timer-overlay-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
    .timer-ready-msg{position:fixed;inset:0;background:rgba(10,10,10,.97);z-index:710;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:fadeInBig .6s ease;}
    @keyframes fadeInBig{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
    .timer-ready-emoji{font-size:5rem;margin-bottom:1rem;animation:teaBounce 1s ease-in-out infinite alternate;}
    @keyframes teaBounce{from{transform:translateY(0)}to{transform:translateY(-12px)}}
    .timer-ready-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,6vw,3.5rem);color:white;margin-bottom:.5rem;text-align:center;}
    .timer-ready-sub{font-size:1rem;color:rgba(255,255,255,.55);font-weight:300;margin-bottom:2rem;text-align:center;}
    /* RECIPE BOOK CTA */
    .recipe-book-cta{display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#2D4A2D,#1B3A1B);border-radius:14px;padding:14px 18px;margin-top:12px;flex-wrap:wrap;gap:10px;}
    .recipe-book-cta-text{font-size:.8rem;color:rgba(255,255,255,.7);font-weight:300;}
    .recipe-book-cta-text strong{color:white;display:block;font-family:'Playfair Display',serif;font-size:.95rem;margin-bottom:2px;}
    .btn-recipe-book{background:var(--gold);color:white;border:none;padding:8px 18px;border-radius:50px;font-family:'Jost',sans-serif;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap;transition:all .2s;}
    .btn-recipe-book:hover{background:#D4943A;}
    .sec-nav{position:fixed;right:16px;bottom:28%;z-index:450;display:flex;flex-direction:column;gap:10px;}
    .sec-dot-wrap{display:flex;align-items:center;gap:8px;cursor:pointer;justify-content:flex-end;}
    .sec-dot-lbl{font-size:.56rem;letter-spacing:.1em;text-transform:uppercase;color:#1C1A17;background:rgba(255,255,255,.96);padding:4px 10px;border-radius:50px;white-space:nowrap;opacity:0;transition:opacity .18s;border:1px solid rgba(0,0,0,.08);pointer-events:none;box-shadow:0 2px 12px rgba(0,0,0,.2);font-weight:500;}
    .sec-dot-wrap:hover .sec-dot-lbl{opacity:1;}
    .sec-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.55);border:none;transition:all .3s;flex-shrink:0;box-shadow:0 0 0 2px rgba(255,255,255,.85),0 0 0 4px rgba(0,0,0,.2);}
    .sec-dot.active{background:var(--gold);transform:scale(1.5);box-shadow:0 0 0 2.5px rgba(255,255,255,1),0 0 0 5px rgba(196,137,58,.6),0 0 14px rgba(196,137,58,.6);}
    .sec-dot-wrap:hover .sec-dot:not(.active){transform:scale(1.2);}
    .back-top{position:fixed;bottom:90px;right:28px;z-index:399;background:var(--bark);color:white;border:none;width:44px;height:44px;border-radius:50%;font-size:1.1rem;cursor:pointer;box-shadow:0 4px 16px rgba(28,26,23,.25);transition:all .3s;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;}
    .back-top.visible{opacity:1;pointer-events:all;}
    .back-top:hover{background:var(--sage-d);transform:translateY(-3px);}
    .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--bark);color:var(--parch);padding:10px 24px;font-size:.76rem;letter-spacing:.06em;z-index:1000;box-shadow:0 8px 28px rgba(28,26,23,.25);border-radius:50px;animation:toastIn .35s cubic-bezier(.34,1.56,.64,1);white-space:nowrap;}
    @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(13px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

    /* 2AM OVERLAY */
    .twoam-ov{position:fixed;inset:0;background:#0A0A0A;z-index:700;display:flex;align-items:center;justify-content:center;padding:2rem;}
    .twoam-inner{max-width:500px;text-align:center;}
    .twoam-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,3.5rem);color:white;font-weight:300;margin-bottom:1rem;font-style:italic;}
    .twoam-sub{font-size:.9rem;color:rgba(255,255,255,.45);font-weight:300;line-height:1.8;margin-bottom:2rem;}
    .twoam-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;margin-bottom:1.5rem;text-align:left;}
    .twoam-blend-name{font-family:'Playfair Display',serif;font-size:1.4rem;color:white;margin-bottom:8px;}
    .twoam-steps{list-style:none;margin-bottom:16px;}
    .twoam-steps li{font-size:.82rem;color:rgba(255,255,255,.6);padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:flex-start;gap:10px;}
    .twoam-steps li::before{content:'✦';color:var(--gold);font-size:.55rem;margin-top:4px;flex-shrink:0;}
    .twoam-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
    .btn-twoam{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.8);padding:10px 24px;font-family:'Jost',sans-serif;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border-radius:50px;transition:all .2s;}
    .btn-twoam:hover{background:rgba(255,255,255,.15);}
    .btn-twoam.gold{background:var(--gold);border-color:var(--gold);color:white;}

    /* RING TAG TOOLTIPS */
    .ring-tag-wrap{position:relative;display:inline-block;}
    .ring-tag-tip{position:absolute;bottom:calc(100% + 10px);left:0;transform:none;
      width:230px;background:#1C1A17;color:rgba(255,255,255,.88);font-size:.74rem;
      line-height:1.6;padding:12px 16px;border-radius:14px;pointer-events:none;
      opacity:0;transition:opacity .25s ease;z-index:200;font-family:'Jost',sans-serif;
      border:1px solid rgba(196,137,58,.3);text-align:left;font-weight:300;
      box-shadow:0 10px 32px rgba(0,0,0,.55);}
    .ring-tag-tip::after{content:'';position:absolute;top:100%;left:20px;transform:none;
      border:7px solid transparent;border-top-color:#1C1A17;}
    .ring-tag-wrap:hover .ring-tag-tip{opacity:1;}

    /* COUNT BADGE */
    .cbadge{display:inline-block;background:var(--sage-p);color:var(--sage-d);font-size:.65rem;padding:2px 9px;border-radius:50px;margin-left:7px;font-weight:500;}

    /* FOOTER */
    footer{background:#1C1A17;padding:60px 2.5rem 32px;border-radius:0 0 22px 22px;}
    .ft-in{max-width:1280px;margin:0 auto;}
    .ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:2.8rem;}
    .ft-brand{font-family:'Playfair Display',serif;font-size:1.4rem;color:white;margin-bottom:9px;}
    .ft-sub{font-size:.76rem;color:rgba(255,255,255,.3);font-weight:300;line-height:1.7;max-width:250px;}
    .ft-col-h{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:13px;}
    .ft-lnk{display:block;font-size:.78rem;color:rgba(255,255,255,.5);margin-bottom:8px;cursor:pointer;transition:color .2s;font-weight:300;}
    .ft-lnk:hover{color:var(--gold);}
    .ft-disclaimer{border-top:1px solid rgba(255,255,255,.08);padding:20px 0 0;margin-bottom:16px;}
    .ft-disclaimer-txt{font-size:.7rem;color:rgba(255,255,255,.28);font-weight:300;line-height:1.75;text-align:center;max-width:900px;margin:0 auto;}
    .ft-disclaimer-txt strong{color:rgba(255,255,255,.45);font-weight:500;}
    .ft-div{border:none;border-top:1px solid rgba(255,255,255,.06);margin-bottom:20px;}
    .ft-bot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;}
    .ft-copy{font-size:.68rem;color:rgba(255,255,255,.2);}
    .tea-sci-card{background:white;border:1px solid var(--dust);border-radius:20px;padding:22px;transition:box-shadow .3s,transform .3s;min-width:0;}
    .tea-sci-card:hover{box-shadow:0 8px 32px rgba(28,26,23,.1);transform:translateY(-3px);}
    .warn-badge{display:inline-flex;align-items:center;gap:5px;background:#FFF5F0;border:1px solid #F0C0B0;color:#8B3A2A;font-size:.62rem;font-weight:500;letter-spacing:.06em;padding:3px 10px;border-radius:50px;margin-bottom:6px;}
    .warn-block{background:#FFF8F6;border:1px solid #F0C0B0;border-radius:12px;padding:10px 14px;margin-bottom:12px;font-size:.74rem;color:#7A3020;line-height:1.55;font-weight:300;}
    .warn-block strong{color:#8B3A2A;font-weight:600;display:block;margin-bottom:3px;}

    /* RINGS PAGE — MOBILE STICKY CUSTOMIZE BAR */
    .rings-mob-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:480;background:linear-gradient(135deg,#1C1A17,#2A1F15);border-top:1px solid rgba(196,137,58,.35);padding:12px 20px;align-items:center;justify-content:space-between;gap:12px;backdrop-filter:blur(8px);}
    @media(max-width:960px){.rings-mob-cta{display:flex;}}
    .rings-mob-cta-txt{font-size:.68rem;color:rgba(255,255,255,.6);font-weight:300;line-height:1.3;}
    .rings-mob-cta-txt strong{display:block;color:white;font-size:.78rem;margin-bottom:2px;}
    .rings-mob-cta-btn{background:var(--gold);color:white;border:none;padding:10px 20px;border-radius:50px;font-family:'Jost',sans-serif;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:all .2s;}
    .rings-mob-cta-btn:hover{background:#D4943A;}

    /* MEN'S FEATURE BAND */
    .men-band{background:linear-gradient(135deg,#0D0D1A 0%,#1A1A2A 50%,#0D1A0D 100%);padding:56px 2.5rem;position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);}
    .men-band::before{content:'⚡';position:absolute;font-size:22rem;color:rgba(255,255,255,.02);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;line-height:1;}
    .men-band-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
    .men-band-copy{}
    .men-band-eye{font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(196,137,58,.7);margin-bottom:12px;}
    .men-band-h{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.5vw,3rem);color:white;font-weight:400;line-height:1.15;margin-bottom:16px;}
    .men-band-h em{color:var(--gold);font-style:italic;}
    .men-band-p{font-size:.9rem;color:rgba(255,255,255,.5);font-weight:300;line-height:1.85;margin-bottom:24px;max-width:440px;}
    .men-band-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;}
    .men-band-chip{font-size:.65rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.65);padding:5px 13px;border-radius:50px;letter-spacing:.04em;}
    .men-band-btns{display:flex;gap:12px;flex-wrap:wrap;}
    .btn-men-main{background:linear-gradient(135deg,#1a1a3a,#0d0d1a);color:white;border:1.5px solid rgba(196,137,58,.5);padding:13px 28px;font-family:'Jost',sans-serif;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;border-radius:50px;transition:all .3s;}
    .btn-men-main:hover{border-color:var(--gold);box-shadow:0 6px 24px rgba(196,137,58,.25);}
    .btn-men-ghost{background:none;color:rgba(255,255,255,.6);border:1.5px solid rgba(255,255,255,.15);padding:13px 28px;font-family:'Jost',sans-serif;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;border-radius:50px;transition:all .3s;}
    .btn-men-ghost:hover{border-color:rgba(255,255,255,.35);color:white;}
    .men-band-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .men-blend-preview{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px 16px;transition:all .25s;cursor:pointer;}
    .men-blend-preview:hover{background:rgba(255,255,255,.08);border-color:rgba(196,137,58,.3);}
    .men-blend-preview-name{font-family:'Playfair Display',serif;font-size:.88rem;color:white;margin-bottom:3px;}
    .men-blend-preview-ben{font-size:.6rem;color:rgba(196,137,58,.75);letter-spacing:.06em;}
    @media(max-width:960px){
      .men-band-in{grid-template-columns:1fr;gap:32px;}
      .men-band{padding:48px 1.5rem;}
    }
    @media(max-width:600px){
      .men-band{padding:40px 1.2rem;}
      .men-band-h{font-size:clamp(1.7rem,7vw,2.3rem);}
      .men-band-grid{grid-template-columns:1fr;}
    }

    /* SAVE MY RITUAL MODAL */
    .sav-ov{position:fixed;inset:0;background:rgba(18,14,10,.75);z-index:950;display:flex;align-items:center;justify-content:center;padding:1.5rem;backdrop-filter:blur(10px);}
    .sav-box{background:var(--parch);max-width:480px;width:100%;border-radius:28px;box-shadow:0 32px 100px rgba(0,0,0,.35);overflow:hidden;}
    .sav-head{background:linear-gradient(135deg,var(--bark),#3A2A18);padding:28px 28px 22px;position:relative;}
    .sav-head-eye{font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px;}
    .sav-head-h{font-family:'Playfair Display',serif;font-size:1.6rem;color:white;font-weight:400;line-height:1.2;margin-bottom:4px;}
    .sav-head-sub{font-size:.76rem;color:rgba(255,255,255,.5);font-weight:300;line-height:1.5;}
    .sav-close{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:.85rem;display:flex;align-items:center;justify-content:center;transition:all .2s;}
    .sav-close:hover{background:rgba(255,255,255,.22);}
    .sav-items{padding:16px 24px;border-bottom:1px solid var(--dust);max-height:180px;overflow-y:auto;}
    .sav-item{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.05);font-size:.75rem;color:var(--bark);}
    .sav-item:last-child{border-bottom:none;}
    .sav-item-name{font-weight:500;flex:1;}
    .sav-item-qty{color:#9A8A7A;margin:0 10px;}
    .sav-item-price{font-weight:600;color:var(--gold);}
    .sav-body{padding:20px 24px 26px;}
    .sav-lbl{font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:var(--sage-d);margin-bottom:8px;font-weight:600;}
    .sav-input{width:100%;box-sizing:border-box;border:1.5px solid var(--dust);border-radius:12px;padding:12px 16px;font-family:'Jost',sans-serif;font-size:.88rem;color:var(--bark);background:white;outline:none;transition:border-color .2s;margin-bottom:14px;}
    .sav-input:focus{border-color:var(--gold);}
    .sav-note{font-size:.68rem;color:#9A8A7A;line-height:1.6;margin-bottom:18px;font-style:italic;}
    .sav-btn{width:100%;background:linear-gradient(135deg,var(--bark),#3A2A18);color:white;border:none;padding:14px;border-radius:14px;font-family:'Jost',sans-serif;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:8px;}
    .sav-btn:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 8px 28px rgba(28,26,23,.3);}
    .sav-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
    .sav-success{padding:28px;text-align:center;}
    .sav-success-icon{font-size:2.8rem;margin-bottom:14px;}
    .sav-success-h{font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--bark);margin-bottom:8px;}
    .sav-success-p{font-size:.78rem;color:#8A7A6A;line-height:1.7;font-weight:300;}
    @media(max-width:600px){
      .sav-box{border-radius:24px 24px 0 0;position:fixed;bottom:0;left:0;right:0;max-width:100%;}
      .sav-ov{align-items:flex-end;padding:0;}
    }

    /* FREQUENCY RIPPLE RINGS */
    @keyframes freqRingA{0%{transform:scale(1);border-color:rgba(196,137,58,.6);}100%{transform:scale(1.08);border-color:rgba(196,137,58,0);}}
    @keyframes freqRingB{0%{transform:scale(1);border-color:rgba(196,137,58,.35);}100%{transform:scale(1.15);border-color:rgba(196,137,58,0);}}
    @keyframes freqRingC{0%{transform:scale(1);border-color:rgba(196,137,58,.18);}100%{transform:scale(1.22);border-color:rgba(196,137,58,0);}}
    .freq-wrap{position:relative;border-radius:12px;}
    .freq-rA,.freq-rB,.freq-rC{position:absolute;inset:-3px;border-radius:15px;border:1.5px solid rgba(196,137,58,0);pointer-events:none;}
    .freq-wrap:hover .freq-rA{animation:freqRingA 1.6s ease-out infinite;}
    .freq-wrap:hover .freq-rB{animation:freqRingB 1.6s ease-out .55s infinite;}
    .freq-wrap:hover .freq-rC{animation:freqRingC 1.6s ease-out 1.1s infinite;}

    /* SPINNING SHOP NOW */
    .spin-cta{position:relative;width:140px;height:140px;cursor:pointer;flex-shrink:0;}
    .spin-outer{position:absolute;inset:0;border-radius:50%;animation:spinRing 14s linear infinite;}
    .spin-text-wrap{position:absolute;inset:0;}
    .spin-char{position:absolute;top:0;left:50%;font-size:9.5px;font-family:'Jost',sans-serif;font-weight:500;color:rgba(196,137,58,.9);letter-spacing:.02em;transform-origin:0 70px;width:12px;text-align:center;margin-left:-6px;}
    .spin-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:76px;height:76px;background:var(--gold);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(196,137,58,.45);transition:all .3s;}
    .spin-cta:hover .spin-center{background:var(--bark);box-shadow:0 8px 28px rgba(61,43,31,.4);transform:translate(-50%,-50%) scale(1.1);}
    .spin-arrow{font-size:1.3rem;color:white;line-height:1;}
    .spin-label{font-size:.48rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.85);margin-top:2px;font-family:'Jost',sans-serif;}
    @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes spinRingCCW{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}

    /* HOME PAGE CHAI HOLISTIC SPINNING BADGE */
    .chai-spin{position:relative;width:160px;height:160px;cursor:pointer;flex-shrink:0;}
    .chai-spin-outer{position:absolute;inset:0;border-radius:50%;animation:spinRingCCW 16s linear infinite;}
    .chai-spin-char{position:absolute;top:0;left:50%;font-size:9px;font-family:'Jost',sans-serif;font-weight:500;color:var(--bark);letter-spacing:.04em;transform-origin:0 80px;width:11px;text-align:center;margin-left:-5.5px;}
    .chai-spin-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:98px;height:98px;background:var(--bark);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 6px 28px rgba(61,43,31,.28);transition:all .35s;border:2px solid var(--dust);}
    .chai-spin:hover .chai-spin-center{background:var(--sage-d);transform:translate(-50%,-50%) scale(1.08);box-shadow:0 10px 36px rgba(74,114,80,.35);}
    .chai-spin-arrow{font-size:1.5rem;color:var(--parch);transform:rotate(-30deg);display:inline-block;line-height:1;}
    .chai-spin-lbl{font-size:.44rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(247,242,234,.78);font-family:'Jost',sans-serif;text-align:center;line-height:1.5;margin-top:2px;}

    /* RINGS PAGE SPINNING BADGE */
    .ring-spin-badge{position:relative;width:180px;height:180px;cursor:pointer;flex-shrink:0;margin:0 auto;}
    .ring-spin-outer{position:absolute;inset:0;border-radius:50%;animation:spinRing 18s linear infinite;}
    .ring-spin-char{position:absolute;top:0;left:50%;font-size:9px;font-family:'Jost',sans-serif;font-weight:500;color:rgba(196,137,58,.85);letter-spacing:.04em;transform-origin:0 90px;width:11px;text-align:center;margin-left:-5.5px;}
    .ring-spin-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:110px;height:110px;background:linear-gradient(135deg,rgba(45,74,45,.9),rgba(27,58,27,1));border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 0 0 1px rgba(196,137,58,.3),0 8px 32px rgba(0,0,0,.5);transition:all .4s;border:1px solid rgba(196,137,58,.2);}
    .ring-spin-badge:hover .ring-spin-center{background:linear-gradient(135deg,rgba(196,137,58,.9),rgba(180,120,30,1));box-shadow:0 0 0 1px rgba(196,137,58,.6),0 12px 40px rgba(196,137,58,.3);transform:translate(-50%,-50%) scale(1.06);}
    .ring-spin-icon{font-size:2.2rem;margin-bottom:4px;transform:rotate(-30deg);display:inline-block;}
    .ring-spin-lbl{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.92);font-family:'Playfair Display',serif;text-align:center;line-height:1.35;font-style:italic;}

    /* BOOK & RINGS FEATURED */
    .featured-band{display:grid;grid-template-columns:1fr 1fr;gap:2px;}
    .feat-book{background:linear-gradient(135deg,#2D4A2D 0%,#1B3A1B 100%);padding:48px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
    .feat-book::before{content:'📖';position:absolute;right:-20px;bottom:-20px;font-size:8rem;opacity:.07;}
    .feat-rings{background:linear-gradient(135deg,#1C1A17 0%,#2D2520 100%);padding:48px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
    .feat-rings::before{content:'◎';position:absolute;right:-10px;bottom:-20px;font-size:10rem;color:rgba(196,137,58,.08);font-weight:300;}
    .feat-eye{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:10px;}
    .feat-title{font-family:'Playfair Display',serif;font-size:clamp(1.4rem,2.5vw,2.2rem);color:white;font-weight:400;line-height:1.2;margin-bottom:10px;}
    .feat-title em{font-style:italic;color:var(--gold);}
    .feat-desc{font-size:.84rem;color:rgba(255,255,255,.55);font-weight:300;line-height:1.7;margin-bottom:1.5rem;max-width:340px;}
    .feat-price{font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--gold);margin-bottom:1.2rem;}
    .btn-feat{background:var(--gold);color:white;border:none;padding:12px 28px;font-family:'Jost',sans-serif;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .3s;border-radius:50px;display:inline-block;}
    .btn-feat:hover{background:#D4943A;transform:translateY(-2px);box-shadow:0 6px 20px rgba(196,137,58,.35);}
    .btn-feat-ghost{background:transparent;color:rgba(255,255,255,.75);border:1.5px solid rgba(255,255,255,.25);padding:12px 28px;font-family:'Jost',sans-serif;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .3s;border-radius:50px;display:inline-block;}
    .btn-feat-ghost:hover{border-color:var(--gold);color:var(--gold);}

    .page{padding-top:0;}

    /* ── HAMBURGER MENU ── */
    .ham-btn{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:600;}
    .ham-btn span{display:block;width:22px;height:2px;background:var(--bark);border-radius:2px;transition:all .3s;}
    .mob-menu{display:none;position:fixed;inset:0;top:74px;background:rgba(247,242,234,.98);backdrop-filter:blur(20px);z-index:490;padding:24px 2rem;overflow-y:auto;flex-direction:column;gap:0;}
    .mob-menu.open{display:flex;}
    .mob-lnk{font-size:.9rem;letter-spacing:.1em;text-transform:uppercase;color:var(--bark);padding:16px 0;border-bottom:1px solid var(--dust);cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-family:'Jost',sans-serif;}
    .mob-lnk:hover{color:var(--gold);}
    .mob-lnk-special{color:var(--gold);font-weight:500;}

    /* ── TABLET (≤960px) ── */
    @media(max-width:960px){
      nav{padding:0 1.2rem;border-radius:0;}
      .nav-links{display:none;}
      .ham-btn{display:flex;}
      .hero-inner{grid-template-columns:1fr;gap:2rem;padding:32px 1.5rem 40px;}
      .hero-visual{display:none;}
      .hero-h{font-size:clamp(2.2rem,7vw,3.5rem);}
      .hero-p{font-size:.88rem;max-width:100%;}
      .philo{grid-template-columns:1fr;}
      .philo-vis{min-height:220px;padding:40px;}
      .featured-band{grid-template-columns:1fr;}
      .feat-book,.feat-rings{padding:36px 28px;}
      .b-showcase{grid-template-columns:repeat(2,1fr);}
      .ft-grid{grid-template-columns:1fr 1fr;gap:2rem;}
      .sec{padding:50px 1.5rem;}
      .pgrid{grid-template-columns:repeat(auto-fill,minmax(220px,1fr));}
      .cgrid{grid-template-columns:repeat(auto-fill,minmax(240px,1fr));}
      .rgrid{grid-template-columns:1fr;}
      .ringsgrid{grid-template-columns:repeat(auto-fill,minmax(220px,1fr));}
      .chai-spin{width:120px;height:120px;}
      .chai-spin-center{width:74px;height:74px;}
      .chai-spin-char{transform-origin:0 60px;}
    }

    /* ── MOBILE (≤600px) ── */
    @media(max-width:600px){
      nav{height:64px;padding:0 1rem;}
      .nav-logo-img{width:38px;height:38px;}
      .nav-logo-text span:first-child{font-size:1.1rem;}
      .nav-logo-text span:last-child{display:none;}
      .cart-btn{padding:7px 12px;font-size:.6rem;}
      .mob-menu{top:64px;}

      /* Hero */
      .hero{min-height:auto;}
      .hero-inner{padding:28px 1.2rem 36px;gap:1.5rem;}
      .hero-h{font-size:clamp(1.9rem,8vw,2.8rem);margin-bottom:1rem;}
      .hero-p{font-size:.84rem;margin-bottom:1.4rem;}
      .hero-btns{gap:8px;}
      .btn-main,.btn-ghost,.btn-finder{padding:11px 20px;font-size:.68rem;}
      .hero-eye{margin-bottom:1rem;}
      .chai-spin{display:none;}

      /* Sections */
      .sec{padding:40px 1.2rem;border-radius:14px;margin:4px 0;}
      .sh-h{font-size:clamp(1.5rem,6vw,2.2rem);}
      .sh{margin-bottom:1.8rem;}

      /* Grids → single column */
      .b-showcase{grid-template-columns:1fr;}
      .pgrid{grid-template-columns:1fr;}
      .cgrid{grid-template-columns:1fr;}
      .rgrid{grid-template-columns:1fr;}
      .ringsgrid{grid-template-columns:1fr;}
      .hgrid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));}
      .ft-grid{grid-template-columns:1fr;gap:1.5rem;}
      footer{padding:40px 1.2rem 24px;border-radius:0;}

      /* Pills/filters */
      .pills{gap:6px;}
      .pill{padding:6px 14px;font-size:.62rem;}

      /* Cards */
      .pcard-name{font-size:1rem;}
      .ccard-name{font-size:.95rem;}
      .rcard-name{font-size:.95rem;}

      /* Cart drawer */
      .drawer{width:100vw;border-radius:20px 20px 0 0;top:auto;bottom:0;height:88vh;}

      /* Modals */
      .modal{max-height:95vh;border-radius:20px 20px 0 0;position:fixed;bottom:0;left:0;right:0;width:100%;max-width:100%;}
      .modal-ov{display:flex;align-items:flex-end;padding:0;}
      .modal-head{border-radius:20px 20px 0 0;}

      /* Featured band */
      .featured-band{grid-template-columns:1fr;}
      .feat-book,.feat-rings{padding:28px 22px;}
      .feat-title{font-size:clamp(1.2rem,5vw,1.7rem);}

      /* Philosophy */
      .philo{grid-template-columns:1fr;}
      .philo-vis{min-height:180px;padding:32px 24px;}
      .philo-txt{padding:32px 24px;}
      .philo-quote{font-size:clamp(1.1rem,4vw,1.5rem);}

      /* Marquee */
      .mq{border-radius:10px;margin:4px 0;}

      /* Rings page */
      .rng{padding:24px 20px;}
      .rng-name{font-size:1.2rem;}

      /* Floating buttons */
      .twoam-btn{bottom:20px;right:16px;padding:9px 14px;font-size:.64rem;}
      .back-top{bottom:72px;right:16px;width:38px;height:38px;font-size:1rem;}
      .sec-nav{right:10px;}

      /* Hero cards hidden on mobile — replace with simpler layout */
      .hero-visual{display:none;}

      /* Season banner */
      .season-banner{padding:8px 1rem;gap:8px;flex-direction:column;text-align:center;}

      /* Intention / Sip & Seek buttons */
      .hero-btns button{width:100%;justify-content:center;}
    }

    /* ── SMALL MOBILE (≤380px) ── */
    @media(max-width:380px){
      .hero-h{font-size:1.75rem;}
      .btn-main,.btn-ghost,.btn-finder{padding:10px 16px;font-size:.65rem;}
      .sec{padding:32px 1rem;}
    }
  `;

  // --- 2AM OVERLAY ---------------------------------------------------------
  const TwoAMOverlay = () => {
    const blend = BLENDS.find(b => b.id === "m2");
    return (
      <div className="twoam-ov">
        <div className="twoam-inner">
          <div className="twoam-title">Can't sleep?</div>
          <div className="twoam-sub">You're not alone. Let's make you something warm.<br />This blend was made for exactly this moment.</div>
          <div className="twoam-card">
            <div className="twoam-blend-name">2AM Reset</div>
            <ul className="twoam-steps">
              <li>Combine 1 tsp cinnamon, 1/2 tsp cardamom, 1/4 tsp ginger, 2 cloves</li>
              <li>⏱ Bring water to just off the boil -- boil then wait 60 seconds</li>
              <li>Steep for 8 minutes. Let it sit and work.</li>
              <li>Strain. Add raw honey if you'd like.</li>
              <li>Sit somewhere soft. Breathe. Sip slowly.</li>
            </ul>
            {timerFor === "2am" && (timerSec !== null || timerDone) ? (
              // When 2AM timer is running -- show the full overlay on top of 2AM screen
              // (The LargeTimerOverlay renders globally so it appears automatically)
              <div style={{textAlign:"center",padding:"16px",background:"rgba(196,137,58,.1)",borderRadius:14,border:"1px solid rgba(196,137,58,.3)"}}>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:6}}>Timer started -- full screen counting</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"2.2rem",color:"var(--gold)"}}>{timerSec !== null ? fmt(timerSec) : "Ready"}</div>
                <div style={{fontSize:".68rem",color:"rgba(255,255,255,.35)",marginTop:4}}>The steaming cup timer is counting above this screen</div>
                <button className="btn-twoam" style={{marginTop:10,background:"rgba(196,137,58,.2)",borderColor:"rgba(196,137,58,.4)"}} onClick={stopTimer}>Stop Timer</button>
              </div>
            ) : (
              <button className="btn-twoam gold" onClick={() => startTimer(blend,"2am")}>Start Brewing -- 8 min</button>
            )}
          </div>
          <div className="twoam-actions">
            <button className="btn-twoam gold" onClick={() => { addToCart({...blend,emoji:"🍵"}); close2AM(); }}>Add to Basket -- ${(blend ? blend.price : "")}</button>
            <button className="btn-twoam" onClick={() => { close2AM(); window.open("https://2amcompanion.com","_blank"); }}>2amcompanion.com ↗</button>
            <button className="btn-twoam" onClick={close2AM}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  // --- TEA FINDER MODAL -----------------------------------------------------
  const TeaFinderModal = () => {
    return (
    <div className="modal-ov" onClick={() => setFinderOpen(false)} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div id="tea-finder-modal" className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-title">✦ Find Your Tea</span>
          <button className="modal-close" onClick={() => { setFinderOpen(false); resetFinder(); }}>✕</button>
        </div>
        <div className="modal-body">
          {!finderResults ? (
            <>
              <div className="finder-progress">
                {TEA_FINDER_STEPS.map((_,i) => <div key={i} className={`finder-dot ${i<=finderStep?"done":""}`}/>)}
              </div>
              <div className="finder-q">{TEA_FINDER_STEPS[finderStep].q}</div>
              <div className="finder-opts">
                {TEA_FINDER_STEPS[finderStep].opts.map(opt => (
                  <div key={opt.v} className="finder-opt" onClick={() => handleFinderAnswer(TEA_FINDER_STEPS[finderStep].key, opt.v)}>
                    <div className="finder-opt-e">{opt.e}</div>
                    <div className="finder-opt-l">{opt.l}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{textAlign:"center",marginBottom:"1.4rem"}}>
                <div style={{fontSize:"1.8rem",marginBottom:"8px"}}>🍵</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"var(--bark)"}}>Your perfect blends</div>
                <div style={{fontSize:".78rem",color:"#8A7A6A",marginTop:"4px",fontWeight:300}}>Based on how you're feeling right now</div>
              </div>
              {(finderResults||[]).map((r,i) => (
                <div key={r.id} className="finder-result">
                  <div className="finder-result-rank">{i+1}</div>
                  <div style={{flex:1}}>
                    <div className="finder-result-name">{r.name}</div>
                    <div className="finder-result-benefit">{r.benefit}</div>
                    <div className="finder-result-desc">{r.desc}</div>
                    {r && r.warning ? <div className="warn-block" style={{marginTop:8}}><strong>⚠ Safety Note</strong>{r.warning}</div> : null}
                    <div style={{display:"flex",gap:"8px",marginTop:"10px",flexWrap:"wrap"}}>
                      <button className="btn-add" onClick={() => { addToCart({...r,emoji:"🍵"}); setFinderOpen(false); resetFinder(); }}>Add to Basket -- ${r.price.toFixed(2)}</button>
                      <button className="btn-ghost" style={{fontSize:".65rem",padding:"7px 14px"}} onClick={() => {
                        const blendIdx = BLENDS.findIndex(b => b.id === r.id);
                        const cleanseIdx = CLEANSING.findIndex(c => c.id === r.id);
                        const recipeKey = blendIdx >= 0 ? `w${blendIdx}` : cleanseIdx >= 0 ? `c${cleanseIdx}` : null;
                        setBlendFilter("All");
                        if (recipeKey) setActiveRecipe(recipeKey);
                        setFinderOpen(false);
                        resetFinder();
                        nav("recipes");
                        if (recipeKey) {
                          setTimeout(() => {
                            const el = document.querySelector(`[data-recipe="${recipeKey}"]`);
                            if (el) el.scrollIntoView({ behavior:"smooth", block:"center" });
                          }, 380);
                        }
                      }}>See Recipe</button>
                    </div>
                    <button
                      style={{marginTop:"10px",width:"100%",background:"rgba(13,26,17,.85)",border:"1px solid rgba(82,184,130,.35)",borderRadius:10,padding:"9px 14px",color:"#52b882",fontFamily:"'Cinzel',serif",fontSize:".62rem",fontWeight:500,letterSpacing:".16em",textTransform:"uppercase",cursor:"pointer",transition:"all .18s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background="rgba(82,184,130,.12)";e.currentTarget.style.borderColor="rgba(82,184,130,.7)";e.currentTarget.style.color="#7dd9a8";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="rgba(13,26,17,.85)";e.currentTarget.style.borderColor="rgba(82,184,130,.35)";e.currentTarget.style.color="#52b882";}}
                      onClick={()=>{ setFinderOpen(false); resetFinder(); nav("tea-library",{blend:r.name}); }}>
                      See Your Full Recipe in the Tea Library →
                    </button>
                    {/* WHY ORDER OURS — tea finder */}
                    <div style={{marginTop:10,background:"linear-gradient(135deg,#F5F0E4,#FAF7F0)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"11px 13px"}}>
                      <div style={{fontSize:".54rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--gold)",marginBottom:6,fontWeight:600}}>✦ Why Order Ours?</div>
                      <p style={{fontSize:".72rem",color:"#6A5A48",lineHeight:1.65,margin:"0 0 7px",fontWeight:300}}>Measurements are the easy part. Results depend on sourcing — the right grade, origin, and freshness. Ours are held to a specific standard so this blend actually delivers.</p>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                        {["🌿 Sourced to standard","⚗️ Same ratio every bag","💰 More economical than DIY","⏱ No sourcing required"].map(t=>(
                          <span key={t} style={{background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.18)",borderRadius:20,padding:"3px 9px",fontSize:".6rem",color:"var(--gold)"}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-ghost" style={{width:"100%",marginTop:"1rem"}} onClick={resetFinder}>Try Again</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
  }

  // --- RITUAL BUILDER MODAL -------------------------------------------------
  const RitualBuilderModal = () => {
    const morningBlends = BLENDS.filter(b => b.occasion === "Morning");
    const eveningBlends = BLENDS.filter(b => b.occasion === "Evening");
    const extras = [...BLENDS.filter(b=>b.occasion==="Wellness"), ...CLEANSING.slice(0,4)];
    const ritualTotal = [ritual.morning,ritual.evening,...ritual.extras].filter(Boolean).reduce((s,i)=>s+i.price,0);
    const hasSelection = ritual.morning || ritual.evening || ritual.extras.length > 0;

    // Auto-scroll to a section inside the ritual modal body
    const scrollToSection = (sectionId) => {
      setTimeout(() => {
        const modal = document.getElementById("ritual-modal-body");
        const el = document.getElementById(sectionId);
        if (modal && el) modal.scrollTo({ top: el.offsetTop - 12, behavior:"smooth" });
      }, 180);
    };

    return (
      <div className="modal-ov" onClick={() => setRitualOpen(false)} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        {/* Modal uses flex-column so header + footer stay fixed, body scrolls */}
        <div className="modal" style={{display:"flex",flexDirection:"column",overflow:"hidden",maxHeight:"90vh"}} onClick={e => e.stopPropagation()}>

          {/* FIXED HEADER */}
          <div className="modal-head" style={{flexShrink:0}}>
            <span className="modal-title">☀ Build Your Daily Ritual</span>
            <button className="modal-close" onClick={() => setRitualOpen(false)}>✕</button>
          </div>

          {/* SCROLLABLE BODY */}
          <div id="ritual-modal-body" style={{flex:1,overflowY:"auto",padding:"20px 28px"}}>
            <div style={{fontSize:".8rem",color:"#8A7A6A",marginBottom:"1.4rem",fontWeight:300}}>
              Pick your morning blend, your evening blend, and any add-ons. Your full ritual adds to cart in one click.
            </div>

            {/* MORNING */}
            <div id="ritual-morning" className="ritual-section">
              <div className="ritual-section-h">
                🌅 Morning Blend (pick one)
                {ritual.morning && <span style={{marginLeft:8,fontSize:".65rem",color:"var(--sage-d)",fontWeight:500,background:"var(--sage-p)",padding:"2px 10px",borderRadius:50}}>✓ {ritual.morning.name}</span>}
              </div>
              <div className="ritual-opts">
                {morningBlends.map(b => {
                  const selected = (ritual.morning ? ritual.morning.id : null) === b.id;
                  return (
                    <div key={b.id}
                      className={`ritual-opt ${selected?"selected":""}`}
                      onClick={() => {
                        const nowSelected = !selected;
                        setRitual(p=>({...p,morning:selected?null:b}));
                        if (nowSelected) scrollToSection("ritual-evening");
                      }}>
                      <div className="ritual-opt-name">{b.name}</div>
                      <div className="ritual-opt-tag">{b.benefit.split("·")[0].trim()} · ${b.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EVENING */}
            <div id="ritual-evening" className="ritual-section">
              <div className="ritual-section-h">
                🌙 Evening Blend (pick one)
                {ritual.evening && <span style={{marginLeft:8,fontSize:".65rem",color:"var(--sage-d)",fontWeight:500,background:"var(--sage-p)",padding:"2px 10px",borderRadius:50}}>✓ {ritual.evening.name}</span>}
              </div>
              <div className="ritual-opts">
                {eveningBlends.map(b => {
                  const selected = (ritual.evening ? ritual.evening.id : null) === b.id;
                  return (
                    <div key={b.id}
                      className={`ritual-opt ${selected?"selected":""}`}
                      onClick={() => {
                        const nowSelected = !selected;
                        setRitual(p=>({...p,evening:selected?null:b}));
                        if (nowSelected) scrollToSection("ritual-addons");
                      }}>
                      <div className="ritual-opt-name">{b.name}</div>
                      <div className="ritual-opt-tag">{b.benefit.split("·")[0].trim()} · ${b.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ADD-ONS */}
            <div id="ritual-addons" className="ritual-section">
              <div className="ritual-section-h">✦ Add-ons (optional)</div>
              <div className="ritual-opts">
                {extras.map(b => (
                  <div key={b.id}
                    className={`ritual-opt ${ritual.extras.find(e=>e.id===b.id)?"selected":""}`}
                    onClick={() => setRitual(p=>({...p,extras:p.extras.find(e=>e.id===b.id)?p.extras.filter(e=>e.id!==b.id):[...p.extras,b]}))}>
                    <div className="ritual-opt-name">{b.name}</div>
                    <div className="ritual-opt-tag">{b.benefit.split("·")[0].trim()} · ${b.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacer so last section isn't hidden behind sticky footer */}
            <div style={{height:hasSelection?8:0}}/>
          </div>

          {/* STICKY SUMMARY FOOTER — always visible once anything is selected */}
          {hasSelection && (
            <div style={{flexShrink:0,borderTop:"2px solid var(--sage-p)",background:"var(--linen)",padding:"14px 28px 20px"}}>
              {/* Mini selection list */}
              <div style={{marginBottom:10}}>
                <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"#8A7A6A",marginBottom:6,fontWeight:500}}>Your Ritual So Far</div>
                {ritual.morning && (
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid var(--dust)"}}>
                    <span style={{fontSize:".8rem",color:"var(--bark)"}}>🌅 {ritual.morning.name}</span>
                    <span style={{fontSize:".78rem",color:"var(--bark)",fontWeight:500}}>${ritual.morning.price}</span>
                  </div>
                )}
                {ritual.evening && (
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid var(--dust)"}}>
                    <span style={{fontSize:".8rem",color:"var(--bark)"}}>🌙 {ritual.evening.name}</span>
                    <span style={{fontSize:".78rem",color:"var(--bark)",fontWeight:500}}>${ritual.evening.price}</span>
                  </div>
                )}
                {ritual.extras.map(e => (
                  <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid var(--dust)"}}>
                    <span style={{fontSize:".8rem",color:"var(--bark)"}}>✦ {e.name}</span>
                    <span style={{fontSize:".78rem",color:"var(--bark)",fontWeight:500}}>${e.price}</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:8}}>
                  <span style={{fontSize:".72rem",color:"#8A7A6A",letterSpacing:".06em",textTransform:"uppercase"}}>Total</span>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"var(--bark)"}}>${ritualTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="btn-main"
                style={{width:"100%",padding:"13px"}}
                disabled={!ritual.morning && !ritual.evening && ritual.extras.length===0}
                onClick={addRitualToCart}>
                Add My Ritual to Cart — ${ritualTotal.toFixed(2)}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- CLEANSE TRACKER MODAL ------------------------------------------------
  const CleanseTrackerModal = () => {
    const tracker = activeTracker ? CLEANSING.find(cl=>cl.id===activeTracker) : null;
    const checkedCount = tracker ? Array.from({length:tracker.days},(_,i)=>checkedDays[`${tracker.id}-${i}`]).filter(Boolean).length : 0;
    const pct = tracker ? Math.round(checkedCount/tracker.days*100) : 0;
    const alreadyInCart = !!(tracker && cart.find(i=>i.id===tracker.id));
    return (
      <div className="modal-ov" onClick={() => setTrackerOpen(false)} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="modal-head">
            <span className="modal-title">🌿 Cleanse Tracker</span>
            <button className="modal-close" onClick={() => setTrackerOpen(false)}>✕</button>
          </div>
          {tracker && (
            <div style={{position:"sticky",top:74,zIndex:3,background:"white",borderBottom:"1px solid var(--dust)",padding:"9px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <button style={{background:"none",border:"none",color:"var(--sage-d)",cursor:"pointer",fontSize:".72rem",letterSpacing:".08em",textTransform:"uppercase",fontFamily:"Jost,sans-serif",padding:0}} onClick={() => setActiveTracker(null)}>
                ← All Cleanses
              </button>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:".88rem",color:"var(--bark)"}}>{tracker.name}</div>
                <div style={{fontSize:".62rem",color:"#8A7A6A"}}>{checkedCount}/{tracker.days} days · {pct}%</div>
              </div>
            </div>
          )}
          <div className="modal-body">
            {!tracker ? (
              <>
                <div style={{fontSize:".8rem",color:"#8A7A6A",marginBottom:"1.2rem",fontWeight:300}}>Select a cleansing protocol to track your daily progress.</div>
                <div className="tracker-select">
                  {CLEANSING.map(cl => (
                    <div key={cl.id} className={`tracker-opt ${activeTracker===cl.id?"on":""}`} onClick={() => setActiveTracker(cl.id)}>
                      <div className="tracker-opt-name">{cl.name}</div>
                      <div className="tracker-opt-days">{cl.days} days · {cl.organ}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div style={{background:"linear-gradient(135deg,#3D2B1F,#2A1F15)",borderRadius:"16px 16px 0 0",padding:"18px 20px",marginBottom:0}}>
                  <div style={{fontSize:".6rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--gold)",marginBottom:5,opacity:.85}}>{tracker.organ} · Cleanse</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"white",marginBottom:4}}>{tracker.name}</div>
                  <div style={{fontSize:".76rem",fontStyle:"italic",color:"rgba(255,255,255,.5)",fontWeight:300}}>{tracker.tagline}</div>
                </div>
                <div style={{background:"white",borderRadius:"0 0 16px 16px",padding:"16px 20px",marginBottom:"1rem",border:"1px solid var(--dust)",borderTop:"none"}}>
                  <div style={{fontSize:".8rem",color:"#6A5F50",lineHeight:1.6,marginBottom:10,fontWeight:300}}>{tracker.desc}</div>
                  <CupValue item={tracker}/>
                  <div style={{fontSize:".66rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:4}}>Ingredients</div>
                  <div style={{fontSize:".76rem",color:"#5A5040",marginBottom:10,lineHeight:1.5}}>{tracker.ingredients.join(" · ")}</div>
                  <div style={{background:"var(--sage-p)",borderRadius:10,padding:"10px 14px",marginBottom:10}}>
                    <div style={{fontSize:".6rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:4}}>Your Protocol</div>
                    <div style={{fontSize:".78rem",color:"#3D2B1F",lineHeight:1.55}}>{tracker.protocol}</div>
                  </div>
                  <div style={{fontSize:".68rem",color:"#8A7A6A",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span>⏱ {tracker.steepMin} min steep</span>
                    <span style={{color:tempIcon(tracker.steepTemp).color,fontWeight:500}}>{tempIcon(tracker.steepTemp).icon} {tempIcon(tracker.steepTemp).label}</span>
                  </div>
                  {tracker.warning && <div className="warn-block" style={{marginTop:10}}><strong>⚠ Safety Note</strong>{tracker.warning}</div>}
                </div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"var(--bark)",marginBottom:8}}>Your Progress</div>
                <div className="tracker-progress-bar"><div className="tracker-progress-fill" style={{width:`${pct}%`}}/></div>
                <div style={{fontSize:".72rem",color:"#8A7A6A",marginBottom:"1rem"}}>{checkedCount} of {tracker.days} days complete · {pct}%</div>
                <div style={{fontSize:".68rem",color:"#8A7A6A",marginBottom:"8px",letterSpacing:".1em",textTransform:"uppercase"}}>Tap a day to mark complete</div>
                <div className="day-grid">
                  {Array.from({length:tracker.days},(_,i) => (
                    <div key={i} className={`day-cell ${checkedDays[`${tracker.id}-${i}`]?"checked":""}`} onClick={() => toggleDay(tracker.id,i)}>
                      {i+1}
                    </div>
                  ))}
                </div>
                {pct===100 && (
                  <div style={{textAlign:"center",padding:"1rem",background:"var(--sage-p)",borderRadius:16,marginTop:"1rem"}}>
                    <div style={{fontSize:"1.5rem",marginBottom:"6px"}}>🎉</div>
                    <div style={{fontFamily:"'Playfair Display',serif",color:"var(--sage-d)"}}>Protocol Complete!</div>
                    <div style={{fontSize:".78rem",color:"#6A5F50",marginTop:"4px",fontWeight:300}}>Your body thanks you. How do you feel?</div>
                  </div>
                )}
                {!alreadyInCart ? (
                  <div style={{position:"sticky",bottom:0,background:"#FFF8F4",borderTop:"2px solid #F0C0A0",padding:"14px 0 4px",marginTop:"1.2rem"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"var(--bark)"}}>{tracker.name}</div>
                        <div style={{fontSize:".64rem",color:"#8A7A6A"}}>{tracker.days}-day protocol · ~{tracker.oz*tracker.cupsPerOz} cups</div>
                      </div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"var(--bark)"}}>${tracker.price}</div>
                    </div>
                    <button className="btn-add-c" style={{width:"100%",padding:"12px",fontSize:".74rem"}} onClick={() => addToCart({...tracker,emoji:"✦"})}>
                      Add to Basket — ${tracker.price} · Start Your {tracker.days}-Day Cleanse
                    </button>
                  </div>
                ) : (
                  <div style={{position:"sticky",bottom:0,background:"var(--sage-p)",borderTop:"1px solid #C8DEC8",padding:"12px 0",marginTop:"1rem",textAlign:"center"}}>
                    <span style={{fontSize:".76rem",color:"var(--sage-d)",fontWeight:500}}>✓ {tracker.name} is already in your cart</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- BOOK PREVIEW MODAL ---------------------------------------------------
  const BookPreviewModal = () => {
    const samples = [
      BLENDS.find(b=>b.id==="m2"), // 2AM Reset
      BLENDS.find(b=>b.id==="e1"), // Chamomile & Calm
      CLEANSING.find(c=>c.id==="c1"), // Liver &amp; Love
      BLENDS.find(b=>b.id==="s1"), // Turmeric Tonic
    ].filter(Boolean);
    const [previewPage, setPreviewPage] = useState(0);
    const sample = samples[previewPage];
    return (
      <div className="modal-ov" onClick={()=>setBookPreview(false)} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div className="modal" style={{maxWidth:700,background:"#FAF7F0"}} onClick={e=>e.stopPropagation()}>
          <div className="modal-head" style={{background:"#2D4A2D",borderRadius:"24px 24px 0 0"}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"white"}}>Sip &amp; Heal</div>
              <div style={{fontSize:".68rem",color:"rgba(255,255,255,.5)",letterSpacing:".1em"}}>THE CHAI HOLISTIC COLLECTION · 40 RECIPES</div>
            </div>
            <button className="modal-close" style={{borderColor:"rgba(255,255,255,.2)",color:"white"}} onClick={()=>setBookPreview(false)}>✕</button>
          </div>

          {/* Book intro */}
          <div style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",padding:"28px",textAlign:"center"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontStyle:"italic",color:"rgba(255,255,255,.6)",marginBottom:"6px"}}>A preview from inside the book</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",color:"white",marginBottom:"4px"}}>
              "{sample.tagline}"
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:"12px"}}>
              {samples.map((_,i)=>(
                <div key={i} onClick={()=>setPreviewPage(i)} style={{width:8,height:8,borderRadius:"50%",background:i===previewPage?"var(--gold)":"rgba(255,255,255,.25)",cursor:"pointer",transition:"all .2s"}}/>
              ))}
            </div>
          </div>

          {/* Recipe page */}
          <div className="modal-body" style={{background:"#FAF7F0"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",marginBottom:"1.5rem"}}>
              <div>
                <div style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--gold)",marginBottom:6}}>{sample.occasion||sample.organ}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",color:"#2D4A2D",marginBottom:6,lineHeight:1.2}}>{sample.name}</div>
                <div style={{fontSize:".82rem",color:"#6A5F50",lineHeight:1.7,fontWeight:300,marginBottom:12}}>{sample.desc}</div>
                <div style={{fontSize:".7rem",color:"#8A7A6A",marginBottom:4,fontWeight:500,letterSpacing:".08em",textTransform:"uppercase"}}>Ingredients</div>
                {sample.ingredients.map((ing,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:"1px solid #E8E0D0",fontSize:".8rem",color:"#3D2B1F"}}>
                    <span style={{color:"#C4893A",fontSize:".6rem"}}>✦</span>{ing}
                  </div>
                ))}
              </div>
              <div>
                <div style={{background:"white",borderRadius:16,padding:"20px",border:"1px solid #E8E0D0",marginBottom:12}}>
                  <div style={{fontSize:".6rem",letterSpacing:".15em",textTransform:"uppercase",color:"#8A7A6A",marginBottom:8}}>How to Brew</div>
                  <div style={{display:"flex",gap:10,marginBottom:8}}>
                    <div style={{background:"#EBF2EC",borderRadius:10,padding:"8px 12px",flex:1,textAlign:"center"}}>
                      <div style={{fontSize:"1.1rem",fontFamily:"'Playfair Display',serif",color:"#2D4A2D"}}>{sample.steepMin} min</div>
                      <div style={{fontSize:".6rem",color:"#8A7A6A"}}>steep time</div>
                    </div>
                    <div style={{background:"#FFF5E0",borderRadius:10,padding:"8px 12px",flex:1,textAlign:"center"}}>
                      <div style={{fontSize:".75rem",fontFamily:"'Playfair Display',serif",color:"#C4893A"}}>{tempIcon(sample.steepTemp).icon}</div>
                      <div style={{fontSize:".6rem",color:"#8A7A6A"}}>{tempIcon(sample.steepTemp).label}</div>
                    </div>
                  </div>
                  <div style={{fontSize:".7rem",color:"#6A5F50",lineHeight:1.6,fontWeight:300}}>
                    Use {sample.servingSize} per 8oz cup. {sample.steepMin >= 10 ? "Simmer low -- don't rush this one." : "Don't over-steep -- pour promptly."} Add honey to taste.
                  </div>
                </div>
                <CupValue item={sample}/>
                <div style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",borderRadius:12,padding:"14px",textAlign:"center"}}>
                  <div style={{fontSize:".68rem",color:"rgba(255,255,255,.5)",marginBottom:4}}>Best for</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",color:"white",fontSize:".9rem"}}>{sample.mood}</div>
                </div>
              </div>
            </div>

            {/* Navigation between previews */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
              <button onClick={()=>setPreviewPage(p=>Math.max(0,p-1))} disabled={previewPage===0}
                style={{background:"none",border:"1.5px solid var(--dust)",padding:"7px 16px",borderRadius:50,fontSize:".72rem",cursor:"pointer",opacity:previewPage===0 ? 0.3:1,fontFamily:"Jost,sans-serif",color:"var(--bark)"}}>
                ← Previous
              </button>
              <span style={{fontSize:".72rem",color:"#8A7A6A"}}>Recipe {previewPage+1} of {samples.length} · 40 total in the book</span>
              <button onClick={()=>setPreviewPage(p=>Math.min(samples.length-1,p+1))} disabled={previewPage===samples.length-1}
                style={{background:"none",border:"1.5px solid var(--dust)",padding:"7px 16px",borderRadius:50,fontSize:".72rem",cursor:"pointer",opacity:previewPage===samples.length-1 ? 0.3:1,fontFamily:"Jost,sans-serif",color:"var(--bark)"}}>
                Next →
              </button>
            </div>

            {/* CTA */}
            <div style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",borderRadius:16,padding:"24px",textAlign:"center"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"white",marginBottom:6}}>
                All 40 recipes. One beautiful book.
              </div>
              <div style={{fontSize:".8rem",color:"rgba(255,255,255,.55)",marginBottom:"1.2rem",fontWeight:300}}>
                Morning rituals · Evening calm · Seasonal blends · 10 cleansing protocols.<br/>Your complete home apothecary -- $24.99.
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                <button className="btn-book" onClick={()=>{addToCart({id:"book1",name:"Sip & Heal: The Chai Holistic Collection",price:24.99,emoji:"📖"});setBookPreview(false);}}>
                  Add to Basket -- $24.99
                </button>
                <button style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"white",padding:"13px 24px",borderRadius:50,fontSize:".73rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",fontFamily:"Jost,sans-serif"}} onClick={()=>{setBookPreview(false);nav("recipes");}}>
                  Browse All Recipes Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- LARGE TIMER OVERLAY --------------------------------------------------
  const LargeTimerOverlay = () => {
    return (
    <div className="timer-overlay">
      <div className="timer-overlay-name">{timerBlendName}</div>

      {/* STEAMING CUP   only shows while actively steeping */}
      {timerOn && (
        <div className="tea-cup-wrap">
          <div className="steam">
            <div className="steam-line"/>
            <div className="steam-line"/>
            <div className="steam-line"/>
            <div className="steam-line"/>
          </div>
          <div className="tea-cup">🍵</div>
        </div>
      )}

      <div className={`timer-overlay-face ${timerSec === 0 ? "done" : ""}`}>
        {timerSec !== null ? fmt(timerSec) : "0:00"}
      </div>

      {/* PULSING STEEPING / PAUSED LABEL */}
      {timerOn
        ? <div className="steeping-label">· steeping ·</div>
        : <div className="paused-label">paused -- tap Resume when ready</div>
      }

      <div className="timer-overlay-keepopen">
        <strong>⚠ Keep This Screen Open</strong>
        <span>Your phone needs to stay awake for the timer to count. If you lock your screen, the timer will pause until you return.</span>
      </div>
      <div className="timer-overlay-btns">
        {timerOn ? (
          <button className="btn-t stop" onClick={() => setTimerOn(false)}>Pause</button>
        ) : (
          <button className="btn-t go" onClick={() => { timerDoneRef.current = false; setTimerOn(true); }}>Resume</button>
        )}
        <button className="btn-t rst" style={{borderColor:"rgba(255,255,255,.2)",color:"rgba(255,255,255,.5)"}} onClick={dismissTimer}>Close</button>
        <button
          onClick={() => { dismissTimer(); window.open("https://2amcompanion.com","_blank"); }}
          style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.4)",color:"rgba(196,137,58,.9)",padding:"8px 16px",borderRadius:50,fontSize:".7rem",letterSpacing:".08em",cursor:"pointer",fontFamily:"Jost,sans-serif",whiteSpace:"nowrap"}}>
          🌙 2AM Companion
        </button>
      </div>
    </div>
  );
  }

  // --- TEA READY SCREEN -----------------------------------------------------
  const TeaReadyScreen = () => {
    return (
    <div className="timer-ready-msg">
      <div className="timer-ready-emoji">🍵</div>
      <div className="timer-ready-title">Your tea is ready</div>
      <div className="timer-ready-sub">
        {timerBlendName} -- brewed to perfection.<br/>
        Sip slowly. You deserve this moment.
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
        <button className="btn-main" style={{fontSize:"1rem",padding:"14px 40px"}} onClick={dismissTimer}>
          Enjoy ✦
        </button>
        <button
          style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.4)",color:"rgba(196,137,58,.9)",padding:"14px 24px",borderRadius:50,fontSize:".78rem",letterSpacing:".08em",cursor:"pointer",fontFamily:"Jost,sans-serif"}}
          onClick={() => { dismissTimer(); window.open("https://2amcompanion.com","_blank"); }}>
          🌙 2AM Companion
        </button>
      </div>
      <button
        style={{marginTop:20,background:"none",border:"1px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.35)",padding:"8px 24px",borderRadius:50,fontSize:".7rem",cursor:"pointer",fontFamily:"Jost,sans-serif",letterSpacing:".08em"}}
        onClick={dismissTimer}>
        Close
      </button>
    </div>
  );
  }

  // --- BOOK CTA INLINE -----------------------------------------------------
  const BookCTA = () => {
    return (
    <div className="recipe-book-cta" style={{alignItems:"center",gap:16}}>
      <BookCoverMockup size="sm" onClick={()=>addToCart({id:"book1",name:"Sip & Heal: The Chai Holistic Collection",price:24.99,emoji:"📖"})}/>
      <div className="recipe-book-cta-text">
        <strong>Sip &amp; Heal -- The Complete Collection</strong>
        All 40 recipes in one beautifully crafted guide -- $24.99
      </div>
      <button className="btn-recipe-book" onClick={()=>addToCart({id:"book1",name:"Sip & Heal: The Chai Holistic Collection",price:24.99,emoji:"📖"})}>
        Get the Book
      </button>
    </div>
  );
  }


  // --- BOOK COVER MOCKUP COMPONENT ------------------------------------------
  const BookCoverMockup = ({ size="md", onClick }) => {
    const w = size==="lg" ? 230 : size==="sm" ? 130 : 180;
    const h = Math.round(w * 1.48);
    return (
      <div onClick={onClick}
        style={{cursor:onClick?"pointer":"default",position:"relative",width:w,height:h,
          borderRadius:"3px 10px 10px 3px",
          background:"linear-gradient(160deg,#2D4A2D 0%,#1B3A1B 60%,#142E14 100%)",
          boxShadow:"-8px 8px 0 #142E14,-10px 10px 24px rgba(0,0,0,.5),3px 0 8px rgba(255,255,255,.04) inset",
          padding:size==="lg"?"28px 24px":"20px 16px",
          display:"flex",flexDirection:"column",justifyContent:"space-between",
          border:"1px solid rgba(196,137,58,.35)",transition:"all .35s",flexShrink:0}}
        onMouseEnter={e=>{if(onClick)e.currentTarget.style.transform="translateY(-4px) rotate(.5deg)";}}
        onMouseLeave={e=>{e.currentTarget.style.transform="none";}}>
        {/* Top gold rule */}
        <div style={{width:"100%",height:1,background:"linear-gradient(90deg,transparent,rgba(196,137,58,.7),transparent)",marginBottom:size==="lg"?14:10}}/>
        {/* Herb icon */}
        <div style={{textAlign:"center",fontSize:size==="lg"?"2.6rem":"1.8rem",marginBottom:6,opacity:.88}}>🌿</div>
        {/* Title */}
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:size==="lg"?"1.7rem":"1.2rem",color:"var(--gold)",textAlign:"center",lineHeight:1.15,fontStyle:"italic",marginBottom:4}}>Sip &amp; Heal</div>
        {/* Rule */}
        <div style={{width:"60%",height:1,background:"rgba(196,137,58,.35)",margin:"6px auto"}}/>
        {/* Subtitle */}
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:size==="lg"?".65rem":".52rem",color:"rgba(255,255,255,.65)",textAlign:"center",letterSpacing:".14em",textTransform:"uppercase",marginBottom:size==="lg"?16:10,lineHeight:1.55}}>The Chai Holistic<br/>Collection</div>
        {/* Centre detail */}
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{textAlign:"center",background:"rgba(196,137,58,.1)",border:"1px solid rgba(196,137,58,.25)",borderRadius:8,padding:"8px 12px"}}>
            <div style={{fontSize:size==="lg"?".78rem":".6rem",color:"rgba(196,137,58,.9)",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>40 Recipes</div>
            <div style={{fontSize:size==="lg"?".58rem":".46rem",color:"rgba(255,255,255,.5)",letterSpacing:".1em",textTransform:"uppercase",marginTop:2,fontFamily:"Jost,sans-serif"}}>30 Wellness · 10 Cleanse</div>
          </div>
        </div>
        {/* Bottom */}
        <div style={{marginTop:size==="lg"?16:10}}>
          <div style={{width:"100%",height:1,background:"linear-gradient(90deg,transparent,rgba(196,137,58,.5),transparent)",marginBottom:8}}/>
          <div style={{fontSize:size==="lg"?".5rem":".42rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(255,255,255,.3)",textAlign:"center",fontFamily:"Jost,sans-serif"}}>Chai Holistic</div>
        </div>
        {/* Spine shadow strip */}
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:10,
          background:"linear-gradient(90deg,rgba(0,0,0,.4),rgba(0,0,0,.1))",
          borderRadius:"3px 0 0 3px"}}/>
      </div>
    );
  };

  // --- CART DRAWER ----------------------------------------------------------
  const CartDrawer = () => {
    const suggestions = BUNDLES.filter(b=>!cart.find(i=>i.id===b.id)).slice(0,2);
    const hasTeaInCart = cart.some(i=>i.type==="blend"||i.type==="herb"||(!i.type&&i.oz));
    const hasCleanseInCart = cart.some(i=>i.type==="cleanse"||(i.organ));
    const hasToolInCart = cart.some(i=>i.type==="tool");
    const [expandedTool, setExpandedTool] = useState(null);

    // Pick 2 contextual pairings based on what's in the cart
    const ritualPairings = (() => {
      if (!cart.length || hasToolInCart) return [];
      const cup     = BREW_TOOLS.find(t=>t.id==="t1");
      const ceramic = BREW_TOOLS.find(t=>t.id==="t2");
      const strainer = BREW_TOOLS.find(t=>t.id==="t4");
      const teapot  = BREW_TOOLS.find(t=>t.id==="t5");
      if (hasCleanseInCart) return [strainer, teapot].filter(Boolean);
      if (hasTeaInCart)     return [cup, strainer].filter(Boolean);
      return [cup, ceramic].filter(Boolean);
    })();
    return cartOpen ? (
      <>
        <div className="overlay" onClick={()=>setCartOpen(false)}/>
        <div className="drawer">
          <div className="drw-head">
            <span className="drw-title">Your Ritual Basket {cartCount>0&&`(${cartCount})`}</span>
            <button className="drw-close" onClick={()=>setCartOpen(false)}>✕</button>
          </div>
          <div className="drw-items">
            {/* Cart items — always at top */}
            <div className="drw-cart-list">
              {cart.length===0?(
                <div className="empty"><div className="empty-icon">🍵</div><div className="empty-msg">Your Ritual Basket is empty</div><div className="empty-sub">Add some blends to begin your ritual.</div></div>
              ):cart.map(item=>(
                <div key={item.id} className="ditem">
                  <div className="ditem-icon">{item.emoji||"✦"}</div>
                  <div className="ditem-info">
                    <div className="ditem-name">{item.name}</div>
                    {item.subtitle && <div style={{fontSize:".68rem",color:"var(--sage-d)",marginBottom:2}}>{item.subtitle}</div>}
                    <div className="ditem-price">${(item.price*item.qty).toFixed(2)}</div>
                    {item.oz && <div style={{fontSize:".65rem",color:"var(--sage-d)",marginBottom:"6px"}}>~{item.oz*item.cupsPerOz} cups · ${costPerCup(item.price,item.oz,item.cupsPerOz)}/cup</div>}
                    <div className="ditem-ctrl">
                      <button className="qty-b" onClick={()=>changeQty(item.id,-1)}>−</button>
                      <span className="qty-v">{item.qty}</span>
                      <button className="qty-b" onClick={()=>changeQty(item.id,1)}>+</button>
                      <button className="rm-btn" onClick={()=>removeItem(item.id)}>remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle suggestions — capped height, scrollable */}
            {cart.length>0&&suggestions.length>0&&(
              <div className="cart-sugg">
                <div className="sugg-h">💚 Save more with a bundle</div>
                {suggestions.map(b=>(
                  <div key={b.id} className="sugg-row">
                    <div><div className="sugg-name">{b.name}</div><div className="sugg-save">Save ${b.savings.toFixed(2)}</div></div>
                    <button className="btn-sugg" onClick={()=>addToCart({...b})}>+ Add</button>
                  </div>
                ))}
              </div>
            )}

            {/* Ritual pairings — inside scroll area */}
            {ritualPairings.length>0&&(
              <div className="cart-ritual" style={{background:"linear-gradient(160deg,#FBF7F1 0%,#F4EDE2 100%)",border:"1.5px solid rgba(196,137,58,.28)",borderRadius:18,overflow:"hidden"}}>
                {/* Header */}
                <div style={{padding:"12px 16px 8px",borderBottom:"1px solid rgba(196,137,58,.15)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontSize:".95rem"}}>🫖</span>
                    <div>
                      <div style={{fontSize:".6rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--gold)",fontWeight:600,lineHeight:1}}>Complete Your Ritual</div>
                      <div style={{fontSize:".68rem",color:"#8A7A6A",fontWeight:300,lineHeight:1.3,marginTop:2}}>
                        {hasCleanseInCart
                          ? "Your cleanse needs the right tools to honour the process."
                          : "Every tea deserves a vessel worthy of the moment."}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Paired items */}
                <div style={{padding:"10px 12px",display:"flex",flexDirection:"column",gap:10}}>
                  {ritualPairings.map(t=>{
                    const isOpen = expandedTool === t.id;
                    return (
                    <div key={t.id} style={{background:"white",borderRadius:12,border:`1px solid ${isOpen?"rgba(196,137,58,.35)":"rgba(196,137,58,.12)"}`,boxShadow:isOpen?"0 4px 18px rgba(28,26,23,.08)":"0 2px 8px rgba(28,26,23,.04)",transition:"border-color .2s, box-shadow .2s"}}>
                      {/* Collapsed row */}
                      <div
                        style={{display:"flex",gap:10,alignItems:"center",padding:"10px 12px",cursor:"pointer"}}
                        onClick={()=>setExpandedTool(isOpen ? null : t.id)}>
                        <div style={{width:54,height:54,borderRadius:10,overflow:"hidden",flexShrink:0,background:"#F0EBE3"}}>
                          <img src={t.photo} alt={t.name} onError={e=>{if(t.fallback)e.currentTarget.src=t.fallback;}} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontFamily:"'Playfair Display',serif",fontSize:".84rem",color:"var(--bark)",lineHeight:1.2,marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.name}</div>
                          <div style={{fontSize:".64rem",color:"#9A8A78",fontStyle:"italic",marginBottom:5,lineHeight:1.3}}>{t.tagline}</div>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <span style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"var(--bark)",fontWeight:500}}>${t.price.toFixed(2)}</span>
                            <span style={{fontSize:".58rem",color:"var(--sage-d)",background:"rgba(74,114,80,.08)",padding:"2px 7px",borderRadius:50,border:"1px solid rgba(74,114,80,.18)"}}>{t.material}</span>
                          </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,flexShrink:0}}>
                          <button onClick={e=>{e.stopPropagation();addToCart({...t,type:"tool"});}}
                            style={{background:"var(--gold)",color:"white",border:"none",padding:"7px 13px",fontFamily:"'Jost',sans-serif",fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",borderRadius:50,whiteSpace:"nowrap"}}
                            onMouseEnter={e=>{e.currentTarget.style.background="var(--bark)";}}
                            onMouseLeave={e=>{e.currentTarget.style.background="var(--gold)";}}>
                            + Add
                          </button>
                          <span style={{fontSize:".58rem",color:"var(--gold)",transition:"transform .2s",transform:isOpen?"rotate(180deg)":"rotate(0deg)",display:"block",lineHeight:1}}>▼</span>
                        </div>
                      </div>
                      {/* Expanded detail — scrollable within card */}
                      {isOpen&&(
                        <div style={{padding:"0 14px 14px",borderTop:"1px solid rgba(196,137,58,.12)",maxHeight:320,overflowY:"auto"}}>
                          <div style={{width:"100%",height:130,borderRadius:10,overflow:"hidden",margin:"10px 0 12px",background:"#F0EBE3"}}>
                            <img src={t.photo} alt={t.name} onError={e=>{if(t.fallback)e.currentTarget.src=t.fallback;}} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                          </div>
                          <p style={{fontSize:".76rem",color:"#6A5F50",lineHeight:1.7,fontWeight:300,margin:"0 0 10px"}}>{t.desc}</p>
                          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                            <span style={{fontSize:".58rem",letterSpacing:".08em",background:"var(--sage-p)",color:"var(--sage-d)",padding:"3px 9px",borderRadius:50,border:"1px solid rgba(74,114,80,.15)"}}>{t.capacity}</span>
                            <span style={{fontSize:".58rem",letterSpacing:".08em",background:"var(--sage-p)",color:"var(--sage-d)",padding:"3px 9px",borderRadius:50,border:"1px solid rgba(74,114,80,.15)"}}>Ritual: {t.ritual}</span>
                          </div>
                          <div style={{fontSize:".66rem",color:"#9A8A7A",fontStyle:"italic",padding:"7px 10px",background:"#FAF8F5",borderRadius:8,borderLeft:"2px solid var(--gold)",lineHeight:1.5,marginBottom:12}}>{t.care}</div>
                          <button onClick={e=>{e.stopPropagation();addToCart({...t,type:"tool"});setExpandedTool(null);}}
                            style={{width:"100%",background:"var(--gold)",color:"white",border:"none",padding:"10px",fontFamily:"'Jost',sans-serif",fontSize:".66rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",borderRadius:50}}
                            onMouseEnter={e=>{e.currentTarget.style.background="var(--bark)";}}
                            onMouseLeave={e=>{e.currentTarget.style.background="var(--gold)";}}>
                            Add {t.name} to Cart — ${t.price.toFixed(2)}
                          </button>
                        </div>
                      )}
                    </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="drw-foot">
            {/* Honey add-on — shows when kit is in cart */}
            {cart.some(i => i.id && i.id.includes('_kit')) && !cart.some(i => i.id === 'honey_jar') && (
              <div style={{background:"rgba(192,136,48,.08)",border:"1px dashed rgba(192,136,48,.35)",borderRadius:12,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:"1.2rem",flexShrink:0}}>🍯</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:".72rem",color:"var(--bark)",fontWeight:600,fontFamily:"'Jost',sans-serif"}}>Add Raw Honey Jar — $7</div>
                  <div style={{fontSize:".62rem",color:"#8A7A6A",marginTop:1}}>Your kit recipe calls for raw honey</div>
                </div>
                <button onClick={()=>addToCart({id:"honey_jar",name:"Raw Honey Jar",price:7,emoji:"🍯"})}
                  style={{background:"var(--gold)",color:"white",border:"none",padding:"6px 12px",borderRadius:50,fontSize:".62rem",letterSpacing:".08em",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",cursor:"pointer",flexShrink:0}}>
                  + Add
                </button>
              </div>
            )}
            {/* Extra shaker bottle add-on */}
            {cart.some(i => i.id && i.id.includes('_kit')) && !cart.some(i => i.id === 'shaker_extra') && (
              <div style={{background:"rgba(74,114,80,.06)",border:"1px dashed rgba(74,114,80,.3)",borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:"1.2rem",flexShrink:0}}>🥤</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:".72rem",color:"var(--bark)",fontWeight:600,fontFamily:"'Jost',sans-serif"}}>Add Extra Shaker Bottle — $8</div>
                  <div style={{fontSize:".62rem",color:"#8A7A6A",marginTop:1}}>One included with your kit — add a spare for gym, desk, or a friend</div>
                </div>
                <button onClick={()=>addToCart({id:"shaker_extra",name:"Extra Shaker Bottle",price:8,emoji:"🥤"})}
                  style={{background:"var(--sage-d)",color:"white",border:"none",padding:"6px 12px",borderRadius:50,fontSize:".62rem",letterSpacing:".08em",textTransform:"uppercase",fontFamily:"'Jost',sans-serif",cursor:"pointer",flexShrink:0}}>
                  + Add
                </button>
              </div>
            )}
            <div className="d-sub"><span className="d-sub-l">Subtotal</span><span className="d-sub-r">${cartTotal.toFixed(2)}</span></div>
            <button className="btn-chk" disabled={cart.length===0}>Continue to Checkout</button>

            {/* SAVE MY RITUAL */}
            {cart.length > 0 && (
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <button
                  onClick={()=>{setCartOpen(false);setSaveRitualOpen(true);}}
                  style={{flex:1,background:"transparent",border:"1.5px solid var(--dust)",color:"var(--bark)",padding:"10px 0",borderRadius:12,fontFamily:"'Jost',sans-serif",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--dust)";e.currentTarget.style.color="var(--bark)";}}>
                  🫖 Save My Ritual
                </button>
                <button
                  onClick={()=>{setCartOpen(false);}}
                  style={{flex:1,background:"transparent",border:"1.5px solid var(--dust)",color:"var(--bark)",padding:"10px 0",borderRadius:12,fontFamily:"'Jost',sans-serif",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--sage)";e.currentTarget.style.color="var(--sage-d)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--dust)";e.currentTarget.style.color="var(--bark)";}}>
                  ← Return to Apothecary
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    ):null;
  };

  // --- SAVE MY RITUAL MODAL -------------------------------------------------
  const SaveRitualModal = () => {
    const [email, setEmail] = React.useState("");
    const [sending, setSending] = React.useState(false);
    const [sent, setSent] = React.useState(false);
    const [err, setErr] = React.useState("");

    const cartTotal = cart.reduce((s,i) => s + i.price * i.qty, 0);

    const buildRitualUrl = () => {
      const payload = { items: cart, savedAt: Date.now() };
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      return `${window.location.origin}${window.location.pathname}?ritual=${encoded}`;
    };

    const handleSend = async () => {
      if (!email || !email.includes("@")) { setErr("Please enter a valid email address."); return; }
      setSending(true); setErr("");
      const ritualUrl = buildRitualUrl();
      const itemRows = cart.map(i =>
        `<tr><td style="padding:8px 12px;font-size:14px;color:#5A5040;">${i.emoji||"🍵"} ${i.name}</td><td style="padding:8px 12px;font-size:14px;color:#9A8A7A;text-align:center;">×${i.qty}</td><td style="padding:8px 12px;font-size:14px;color:#C8893A;text-align:right;font-weight:600;">$${(i.price*i.qty).toFixed(2)}</td></tr>`
      ).join("");

      // Ask Claude for a personalized ritual note
      let ritualNote = "";
      try {
        const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 180,
            messages: [{
              role: "user",
              content: `You are the voice of Chai Holistic, a faith-rooted wellness brand whose message is "You are good enough the way you are." Write a warm, personal 2-sentence note about this person's saved ritual basket. Make it feel like it was written just for them, referencing the specific blends/products they chose. Keep it under 60 words, poetic but grounded, no generic wellness clichés. Cart items: ${cart.map(i=>`${i.name} (x${i.qty})`).join(", ")}. Respond with ONLY the note — no quotes, no preamble.`
            }]
          })
        });
        const aiData = await aiRes.json();
        ritualNote = aiData?.content?.[0]?.text?.trim() || "";
      } catch(e) { ritualNote = ""; }

      // Send via Railway + Resend
      try {
        const res = await fetch("https://web-production-4c84.up.railway.app/save-ritual", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: email,
            ritualUrl,
            cartTotal: cartTotal.toFixed(2),
            itemCount: cart.length,
            ritualNote,
            itemRows,
            items: cart
          })
        });
        if (!res.ok) throw new Error("send failed");
        setSent(true);
      } catch(e) {
        // Fallback: copy link to clipboard if Railway not yet wired
        try { await navigator.clipboard.writeText(ritualUrl); } catch(_) {}
        setSent(true);
      }
      setSending(false);
    };

    return (
      <div className="sav-ov" onClick={e=>{if(e.target===e.currentTarget)setSaveRitualOpen(false);}}>
        <div className="sav-box">
          {sent ? (
            <div className="sav-success">
              <div className="sav-success-icon">🫖</div>
              <h3 className="sav-success-h">Your ritual is waiting for you</h3>
              <p className="sav-success-p">
                We sent a restore link to <strong>{email}</strong>.<br/>
                When you're ready, click "Resume My Ritual →" in the email and everything comes right back.
              </p>
              <button className="sav-btn" style={{marginTop:20}} onClick={()=>setSaveRitualOpen(false)}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="sav-head">
                <div className="sav-head-eye">✦ Chai Holistic · Ritual Basket</div>
                <h3 className="sav-head-h">Save My Ritual</h3>
                <p className="sav-head-sub">We'll email you a link that restores your entire basket — one click, no account needed.</p>
                <button className="sav-close" onClick={()=>setSaveRitualOpen(false)}>✕</button>
              </div>

              {/* Cart summary */}
              <div className="sav-items">
                {cart.map(i=>(
                  <div key={i.id} className="sav-item">
                    <span className="sav-item-name">{i.emoji||"🍵"} {i.name}</span>
                    <span className="sav-item-qty">×{i.qty}</span>
                    <span className="sav-item-price">${(i.price*i.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"var(--bark)",fontWeight:600}}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="sav-body">
                <div className="sav-lbl">Your email address</div>
                <input
                  className="sav-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e=>{setEmail(e.target.value);setErr("");}}
                  onKeyDown={e=>{if(e.key==="Enter")handleSend();}}
                  autoFocus
                />
                {err && <div style={{fontSize:".72rem",color:"#C04040",marginTop:-10,marginBottom:12}}>{err}</div>}
                <p className="sav-note">
                  We'll send you a personal ritual note along with a "Resume My Ritual →" link. No account, no spam — just your basket waiting for when you're ready.
                </p>
                <button className="sav-btn" onClick={handleSend} disabled={sending||!email}>
                  {sending ? (
                    <><span style={{display:"inline-block",animation:"spin 1s linear infinite",marginRight:6}}>◌</span> Preparing your ritual…</>
                  ) : (
                    <>✦ Send My Ritual Link</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // --- HOME -----------------------------------------------------------------

  const Home = () => {
    return (
    <div>
      {/* SEASONAL BANNER */}
      {seasonalBlends.length > 0 && (
        <div className="season-banner" style={{marginTop:4}}>
          <span className="season-banner-txt">✦ {MONTH_NAMES[currentMonth]} pick:</span>
          {seasonalBlends.map(b=>(
            <span key={b.id}>
              <span className="season-banner-name">{b.name}</span>
              <button className="btn-season" style={{marginLeft:8}} onClick={()=>addToCart({...b,emoji:"🍵"})}>Add to Basket</button>
            </span>
          ))}
        </div>
      )}

      <section id="sec-hero" className="hero" style={{marginTop:seasonalBlends.length>0?0:0}}>
        <div className="hero-orb a"/><div className="hero-orb b"/>
        <div className="hero-inner">
          <div>
            <div className="hero-eye"><div className="hero-eye-line"/><span className="hero-eye-txt">Chai Holistic · Est. 2024</span></div>
            <h1 className="hero-h"><em>Sip what heals you.</em><br/><span className="g">Bloom</span> where you are.</h1>
            <p className="hero-p">Handcrafted herbal blends from the Sip &amp; Heal tradition. 40 recipes. Every occasion. Every body. Every season.</p>

            {/* PRIMARY ACTIONS */}
            <div className="hero-btns">
              <button className="btn-main" onClick={()=>nav("shop")}>Explore the Collection</button>
              <button className="btn-ghost" onClick={()=>nav("recipes")}>Browse Recipes</button>
              <button className="btn-main" style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",border:"1px solid rgba(196,137,58,.5)",color:"var(--gold)"}} onClick={()=>{setIntentionOpen(true);setIntentionStep(0);setIntentionData({});setIntentionResult(null);}}>🌿 Sip &amp; Seek</button>
            </div>

            {/* FEATURE BUTTONS   clearly separated */}
            <div style={{display:"flex",alignItems:"center",gap:28,flexWrap:"wrap",marginTop:4}}>
              <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:420,flex:1}}>
              {/* Sip & Seek   the star feature */}
              <button
                onClick={()=>{setIntentionOpen(true);setIntentionStep(0);setIntentionData({});setIntentionResult(null);}}
                style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",color:"white",border:"1.5px solid rgba(196,137,58,.4)",padding:"14px 24px",borderRadius:50,fontFamily:"Jost,sans-serif",fontSize:".78rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"all .3s",width:"100%",justifyContent:"center"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.boxShadow="0 6px 24px rgba(196,137,58,.3)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,.4)";e.currentTarget.style.boxShadow="none";}}>
                <span style={{fontSize:"1.1rem"}}>🌿</span>
                <span><strong style={{color:"var(--gold)"}}>Sip &amp; Seek</strong> -- Find your blend · your ritual · your truth</span>
              </button>

              {/* Secondary feature buttons */}
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button className="btn-finder" style={{flex:1}} onClick={()=>setFinderOpen(true)}>✦ Find My Tea</button>
                <button className="btn-ghost" style={{flex:1}} onClick={()=>setRitualOpen(true)}>Build My Ritual</button>
                <button
                  onClick={()=>setProfileOpen(true)}
                  style={{flex:"0 0 100%",background:"linear-gradient(135deg,rgba(192,136,48,.15),rgba(192,136,48,.08))",color:"var(--gold)",border:"1.5px solid rgba(196,137,58,.45)",padding:"11px 20px",borderRadius:50,fontFamily:"Jost,sans-serif",fontSize:".72rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",transition:"all .25s",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(192,136,48,.22)";e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.boxShadow="0 4px 18px rgba(196,137,58,.25)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,rgba(192,136,48,.15),rgba(192,136,48,.08))";e.currentTarget.style.borderColor="rgba(196,137,58,.45)";e.currentTarget.style.boxShadow="none";}}>
                  🌿 <strong>Get My Free Sip &amp; Heal Report</strong> &nbsp;— personalized to your wellness profile
                </button>
              </div>
            </div>
              {/* SPINNING CHAI HOLISTIC BADGE — right of Sip & Seek */}
              <div className="chai-spin" onClick={()=>nav("shop")} title="Shop the Collection">
                <div className="chai-spin-outer">
                  {"CHAI HOLISTIC · SHOP NOW · CHAI HOLISTIC · SHOP NOW · ".split("").map((ch,i)=>(
                    <span key={i} className="chai-spin-char" style={{transform:`rotate(${i*6.15}deg)`}}>{ch}</span>
                  ))}
                </div>
                <div className="chai-spin-center">
                  <span className="chai-spin-arrow">↗</span>
                  <span className="chai-spin-lbl">Shop<br/>Now</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <HeroCards onNav={nav} onOpenRecipe={(id)=>{nav("recipes");setTimeout(()=>setActiveRecipe(id),150);}} />
            <div className="h-badge" style={{cursor:"pointer"}} onClick={()=>nav("recipes")}>Sip &amp; Heal<small>40 Recipes from the book</small></div>
          </div>
        </div>
      </section>

      <div className="mq">
        <div className="mq-track">
          {[...Array(2)].map((_,p)=>["Morning Rituals","Evening Calm","Liver Cleanse","Kidney Flush","⚡ Men's Wellness","Vibe Shift Rings","Tea Finder","Ritual Builder","Cleanse Tracker","Herb Pairing Guide","Sip &amp; Heal · 40 Recipes"].map((t,i)=>(
            <div key={`${p}-${i}`} className="mq-item" style={{cursor:"pointer"}} onClick={()=>{const m={"Morning Rituals":()=>{nav("shop");setBlendFilter("Morning");},"Evening Calm":()=>{nav("shop");setBlendFilter("Evening");},"Liver Cleanse":()=>nav("shop"),"Kidney Flush":()=>nav("shop"),"⚡ Men's Wellness":()=>nav("men"),"Vibe Shift Rings":()=>nav("rings"),"Tea Finder":()=>setFinderOpen(true),"Ritual Builder":()=>setRitualOpen(true),"Cleanse Tracker":()=>setTrackerOpen(true),"Herb Pairing Guide":()=>nav("shop"),"Sip &amp; Heal · 40 Recipes":()=>nav("recipes")};const a=m[t];if(a)a();}}><span>✦</span>{t}</div>
          )))}
        </div>
      </div>

      {/* ── Prayer / Intention Section ──────────────────────────────────── */}
      <PrayerSection onNavigate={(blend) => nav("tea-library", { blend })} />

      {/* ── Tea Library Teaser ─────────────────────────────────────────── */}
      <section style={{background:"#0d1a11",padding:"64px 0 72px",borderTop:"1px solid rgba(255,255,255,.05)",borderBottom:"1px solid rgba(255,255,255,.05)",overflow:"hidden",position:"relative"}}>
        {/* ambient glow */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 70% 80% at 12% 50%,rgba(82,184,130,.07) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 88% 50%,rgba(192,136,48,.06) 0%,transparent 60%)"}}/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 36px",position:"relative",zIndex:1}}>
          {/* header row */}
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:36}}>
            <div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9.5,fontWeight:500,letterSpacing:".36em",textTransform:"uppercase",color:"#52b882",marginBottom:10}}>Chai Holistic · Tea Library</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:700,color:"#fff",lineHeight:1.15,margin:0}}>Find Your Blend</h2>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:16,color:"rgba(255,255,255,.42)",marginTop:8,lineHeight:1.6,maxWidth:420}}>40 therapeutic recipes — from foundational wellness to sacred ceremony</p>
            </div>
            <button
              onClick={()=>nav("tea-library")}
              style={{flexShrink:0,fontFamily:"'Cinzel',serif",fontSize:10,fontWeight:500,letterSpacing:".2em",textTransform:"uppercase",color:"#c08830",background:"rgba(192,136,48,.1)",border:"1px solid rgba(192,136,48,.4)",borderRadius:30,padding:"13px 28px",cursor:"pointer",transition:"all .22s",whiteSpace:"nowrap"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(192,136,48,.2)";e.currentTarget.style.borderColor="rgba(192,136,48,.7)";e.currentTarget.style.color="#deb96a";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(192,136,48,.1)";e.currentTarget.style.borderColor="rgba(192,136,48,.4)";e.currentTarget.style.color="#c08830";}}>
              Explore the Tea Library →
            </button>
          </div>

          {/* horizontal scroll row */}
          <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:10,scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch"}}>
            {[
              {n:1, emoji:"🌙", name:"Deep Sleep & Calm Blend",       part:"I"},
              {n:9, emoji:"⚡", name:"Adaptogen Energy & Vitality",    part:"I"},
              {n:13,emoji:"🦋", name:"Metamorphosis Mood Lift",        part:"II"},
              {n:20,emoji:"✨", name:"Stardust Pineal Activation",     part:"II"},
              {n:26,emoji:"🌋", name:"Volcanic Vitality Men's Blend",  part:"III"},
              {n:40,emoji:"⚗️", name:"Ultimate Liver & Kidney Master", part:"IV"},
            ].map((b,i)=>{
              const partColors={I:"#3a7a55",II:"#1e4a8a",III:"#5a1a6a",IV:"#7a3a0a"};
              const partBg={I:"rgba(39,92,62,.18)",II:"rgba(26,48,104,.18)",III:"rgba(82,24,112,.18)",IV:"rgba(120,60,16,.18)"};
              const partBorder={I:"rgba(39,92,62,.45)",II:"rgba(26,48,104,.45)",III:"rgba(82,24,112,.45)",IV:"rgba(120,60,16,.45)"};
              return (
                <div
                  key={i}
                  onClick={()=>nav("tea-library",{blend:b.name})}
                  style={{flexShrink:0,width:200,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"22px 20px 20px",cursor:"pointer",transition:"transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease, background .15s",backdropFilter:"blur(6px)"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(0,0,0,.45)";e.currentTarget.style.background="rgba(255,255,255,.07)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.background="rgba(255,255,255,.04)";}}>
                  {/* emoji */}
                  <div style={{fontSize:36,lineHeight:1,marginBottom:12}}>{b.emoji}</div>
                  {/* name */}
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:600,color:"#fff",lineHeight:1.3,marginBottom:12}}>{b.name}</div>
                  {/* part badge */}
                  <span style={{fontFamily:"'Cinzel',serif",fontSize:8.5,fontWeight:600,letterSpacing:".18em",textTransform:"uppercase",color:partColors[b.part]||"#52b882",background:partBg[b.part]||partBg.I,border:`1px solid ${partBorder[b.part]||partBorder.I}`,borderRadius:20,padding:"3px 10px",display:"inline-block"}}>
                    Part {b.part}
                  </span>
                </div>
              );
            })}
            {/* see all card */}
            <div
              onClick={()=>nav("tea-library")}
              style={{flexShrink:0,width:160,background:"rgba(192,136,48,.06)",border:"1px dashed rgba(192,136,48,.3)",borderRadius:20,padding:"22px 20px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,transition:"all .22s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(192,136,48,.12)";e.currentTarget.style.borderColor="rgba(192,136,48,.6)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(192,136,48,.06)";e.currentTarget.style.borderColor="rgba(192,136,48,.3)";}}>
              <span style={{fontSize:30}}>📚</span>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:9.5,fontWeight:500,letterSpacing:".16em",textTransform:"uppercase",color:"#c08830",textAlign:"center",lineHeight:1.5}}>View All 40 Blends</span>
            </div>
          </div>

          {/* scroll hint */}
          <div style={{marginTop:12,fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:"rgba(255,255,255,.22)",letterSpacing:".04em"}}>
            ← scroll to explore →
          </div>
        </div>
      </section>

      <section id="sec-features" className="sec sec-sage">
        <div className="sec-in">
          <div className="sh c">
            <div className="sh-eye">What Makes Us Different</div>
            <h2 className="sh-h">Features you won't find<br/><em>anywhere else</em></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            {[
              {icon:"🌿",title:"Sip & Seek",sub:"Personal tea + 7-day ritual",action:()=>{setIntentionOpen(true);setIntentionStep(0);setIntentionData({});setIntentionResult(null);},btn:"Begin"},
              {icon:"✦",title:"Tea Finder",sub:"3 questions → your perfect blend",action:()=>setFinderOpen(true),btn:"Find"},
              {icon:"🌿",title:"Sip & Heal Report",sub:"Free personalized PDF sent to you",action:()=>setProfileOpen(true),btn:"Get"},
              {icon:"☀",title:"Ritual Builder",sub:"Morning & evening in one click",action:()=>setRitualOpen(true),btn:"Build"},
              {icon:"🌿",title:"Cleanse Tracker",sub:"7, 14 or 28-day progress tracker",action:()=>setTrackerOpen(true),btn:"Track"},
              {icon:"🌱",title:"Herb Pairing",sub:"Build your own blends at home",action:()=>nav("shop"),btn:"Explore"},
              {icon:"💰",title:"Cost Per Cup",sub:"vs. a $5 coffee — always shown",action:()=>nav("shop"),btn:"Shop"},
              {icon:"✨",title:"Seasonal Picks",sub:"This month's best blends",action:()=>nav("shop"),btn:"See"},
              {icon:"🫖",title:"Brew Tools",sub:"Cups, teapots & ritual essentials",action:()=>{nav("shop");setTimeout(()=>{const el=document.getElementById("sec-shop-tools");if(el)el.scrollIntoView({behavior:"smooth"});},120);},btn:"Shop"},
              {icon:"💊",title:"Supplements",sub:"Critical nutrients — coming soon",action:()=>{},btn:"Soon",disabled:true},
            ].map(f=>(
              <div key={f.title}
                onClick={f.action}
                style={{background:"white",border:"1px solid var(--dust)",borderRadius:16,padding:"14px 16px",cursor:"pointer",transition:"all .25s",display:"flex",gap:12,alignItems:"flex-start"}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(28,26,23,.08)";e.currentTarget.style.borderColor="var(--sage)";}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="var(--dust)";}}>
                <span style={{fontSize:"1.3rem",flexShrink:0,marginTop:1}}>{f.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:".88rem",color:"var(--bark)",marginBottom:1}}>{f.title}</div>
                  <div style={{fontSize:".66rem",color:"#8A7A6A",fontWeight:300,lineHeight:1.4}}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEN'S WELLNESS BAND — placed after sage features section for max contrast */}
      <div className="men-band">
        <div className="men-band-in">
          <div className="men-band-copy">
            <div className="men-band-eye">⚡ New Collection · 20 Blends</div>
            <h2 className="men-band-h">Built for the<br/><em>Male Body.</em></h2>
            <p className="men-band-p">
              Most wellness brands weren't designed with men in mind. We fixed that. 20 blends targeting what men actually deal with — testosterone, heart health, prostate support, stress, sleep, focus, and the stuff nobody talks about.
            </p>
            <div className="men-band-chips">
              {["Testosterone","Heart Health","Prostate","Stress & Cortisol","Deep Sleep","Focus & Drive","Digestion","Inflammation"].map(c=>(
                <span key={c} className="men-band-chip">{c}</span>
              ))}
            </div>
            <div className="men-band-btns">
              <button className="btn-men-main" onClick={()=>nav("men")}>⚡ Explore Men's Collection</button>
              <button className="btn-men-ghost" onClick={()=>nav("men")}>View All 20 Blends →</button>
            </div>
            <div style={{marginTop:16,padding:"12px 16px",background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>nav("men")}>
              <span style={{fontSize:"1.4rem",flexShrink:0}}>🛡</span>
              <div>
                <div style={{fontSize:".65rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",marginBottom:2,fontFamily:"Jost,sans-serif",fontWeight:600}}>New · Prostate &amp; Urinary Collection</div>
                <div style={{fontSize:".75rem",color:"rgba(255,255,255,.5)",fontFamily:"Jost,sans-serif",lineHeight:1.4}}>10 evidence-informed Saw Palmetto recipes — from daily maintenance to 14-day cleanse protocols</div>
              </div>
              <span style={{color:"rgba(196,137,58,.6)",fontSize:"1rem",flexShrink:0}}>→</span>
            </div>
          </div>
          <div>
            <div style={{fontSize:".58rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:12}}>Featured Blends</div>
            <div className="men-band-grid">
              {[
                {name:"Volcanic Vitality",ben:"Testosterone · Drive · Energy"},
                {name:"Heart of a King",ben:"Heart · Circulation · Blood Pressure"},
                {name:"Deep Rest Protocol",ben:"Deep Sleep · Recovery · Calm"},
                {name:"Brain Fog Lifter",ben:"Focus · Clarity · Memory"},
                {name:"Stress Armour",ben:"Cortisol · Nervous System · Calm"},
                {name:"Prostate Shield",ben:"Prostate · Urinary · Inflammation"},
              ].map(b=>(
                <div key={b.name} className="men-blend-preview" onClick={()=>nav("men")}>
                  <div className="men-blend-preview-name">{b.name}</div>
                  <div className="men-blend-preview-ben">{b.ben}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,textAlign:"center"}}>
              <span style={{fontSize:".68rem",color:"rgba(255,255,255,.3)",letterSpacing:".06em"}}>+ 14 more blends in the collection</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED BOOK + RINGS BAND */}
      <div id="sec-vibe-rings" className="featured-band" style={{scrollMarginTop:"120px"}}>
        <div className="feat-book">
          <div className="feat-eye">📖 BOOK FOR PURCHASE · $24.99</div>
          <h2 className="feat-title">Sip &amp; Heal:<br/><em>The Chai Holistic Collection</em></h2>
          <div style={{display:"flex",gap:24,alignItems:"flex-start",margin:"1.2rem 0",flexWrap:"wrap"}}>
            <BookCoverMockup size="md" onClick={()=>setBookPreview(true)}/>
            {/* Review card — clicks into book preview */}
            <div
              onClick={()=>setBookPreview(true)}
              style={{
                flex:"1 1 180px",minWidth:180,cursor:"pointer",
                background:"rgba(255,255,255,.04)",
                border:"1px solid rgba(196,137,58,.28)",
                borderRadius:14,padding:"18px 20px",
                transition:"border-color .2s, box-shadow .2s",
                position:"relative",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,.7)";e.currentTarget.style.boxShadow="0 0 18px rgba(196,137,58,.18)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,.28)";e.currentTarget.style.boxShadow="none";}}
            >
              <div style={{fontSize:"1.5rem",lineHeight:1,marginBottom:10,color:"var(--gold)",letterSpacing:2}}>"</div>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:".92rem",fontStyle:"italic",color:"rgba(255,255,255,.88)",lineHeight:1.7,margin:"0 0 14px"}}>
                I made the 2am Reset blend on page 12 during a rough week and honestly cried a little. This book understands something most wellness books miss — that healing happens in the quiet moments.
              </p>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#c4893a,#8b5e28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".75rem",fontWeight:700,color:"white",flexShrink:0}}>M</div>
                <div>
                  <div style={{fontSize:".72rem",color:"rgba(255,255,255,.85)",fontWeight:600}}>Maya R.</div>
                  <div style={{fontSize:".62rem",color:"rgba(196,137,58,.7)",letterSpacing:".06em"}}>Verified Purchase</div>
                </div>
                <div style={{marginLeft:"auto",display:"flex",gap:2}}>
                  {[...Array(5)].map((_,i)=><span key={i} style={{color:"var(--gold)",fontSize:".7rem"}}>★</span>)}
                </div>
              </div>
              <div style={{marginTop:14,fontSize:".65rem",color:"rgba(196,137,58,.65)",letterSpacing:".1em",textAlign:"center"}}>Click to preview the book ↗</div>
            </div>
          </div>
          <p className="feat-desc" style={{marginBottom:"1rem"}}>40 hand-crafted tea recipes -- 30 wellness blends and 10 cleansing protocols. Organized by occasion, designed for your life. The complete home apothecary guide.</p>
          <div className="feat-price">$24.99</div>
          <div style={{marginTop:"1rem"}}>
            <button className="btn-feat" onClick={()=>addToCart({id:"book1",name:"Sip & Heal: The Chai Holistic Collection",price:24.99,emoji:"📖"})}>Add to Basket</button>
            <button className="btn-feat-ghost" onClick={()=>setBookPreview(true)}>Preview ↗</button>
          </div>
        </div>
        <div className="feat-rings">
          {/* Vibeshift hero image — full bleed background with overlay */}
          <img
            src="/rings/vibeshift.jpg"
            alt="Vibe Shift Ring glowing lattice"
            style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%",opacity:.35,zIndex:0,borderRadius:"inherit"}}
          />
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(28,26,23,.92) 0%,rgba(28,26,23,.6) 50%,rgba(45,26,10,.7) 100%)",borderRadius:"inherit",zIndex:0}}/>
          <div style={{position:"relative",zIndex:1}}>
          {/* Floating ring preview card */}
          <div style={{float:"right",margin:"0 0 16px 20px",width:130,height:130,borderRadius:16,overflow:"hidden",border:"1px solid rgba(196,137,58,.4)",boxShadow:"0 0 32px rgba(196,137,58,.25), 0 8px 24px rgba(0,0,0,.6)",flexShrink:0}}>
            <img src="/rings/vibeshift.jpg" alt="Vibe Shift Ring" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%"}}/>
          </div>
          <div className="feat-eye" style={{color:"rgba(196,137,58,.6)"}}>◎ FIDGET RINGS FOR PURCHASE · FROM $38</div>
          <h2 className="feat-title">Vibe Shift <em>Rings</em></h2>
          <p className="feat-desc">Your brain runs at 100mph. Your hands need somewhere to go. Precision-engineered fidget rings finished with our proprietary Meridian Infusion Frequency. Looks like jewelry. Works like a reset.</p>
          <div style={{display:"flex",gap:16,marginBottom:"1.2rem",flexWrap:"wrap"}}>
            {[
              {l:"Overthinkers",   tip:"Your mind rarely stops. The spinning band gives your hands somewhere to go while your thoughts find their way back to center."},
              {l:"ADHD brains",    tip:"Focus loves novelty. The tactile rhythm gives your hands a steady anchor — so the rest of you can stay present."},
              {l:"Anxious hands",  tip:"Anxiety shows up in the body first. When your hands need somewhere to go, spin the ring. Breathe. Return."},
              {l:"Zoom days",      tip:"Screen fatigue is real. A quiet spin under the desk helps your nervous system stay regulated when the hours stack up."},
              {l:"Prayer & faith", tip:"Touch your Ring to your phone and a real voice from 2amcompanion.com will pray with you — anytime, anywhere."},
            ].map(t=>(
              <div key={t.l} className="ring-tag-wrap" style={{display:"inline-block"}}>
                <span style={{background:"rgba(196,137,58,.15)",color:"rgba(196,137,58,.9)",fontSize:".65rem",padding:"4px 12px",borderRadius:50,letterSpacing:".06em",cursor:"default",display:"inline-block"}}>✦ {t.l}</span>
                <div className="ring-tag-tip">{t.tip}</div>
              </div>
            ))}
          </div>
          <div className="feat-price">From $38.00</div>
          <div style={{marginBottom:"1.4rem",display:"flex",flexWrap:"wrap",gap:10}}>
            <button className="btn-feat" onClick={()=>nav("rings")}>View the Collection</button>
            <button className="btn-feat-ghost" onClick={()=>{setRingConfig({ring:null});setRcStep(1);setRcDesign(null);setRcSize(null);setRcFreq(null);setRcOuterColor(null);setRcInnerColor(null);setRcPrayerLink(null);setRcLinkUrl('');setRcLinkTestShown(false);setRcLinkAttempts(0);setRcOrderConfirmed(false);}}>Customize Your Ring →</button>
          </div>
          <div style={{background:"rgba(45,74,45,.55)",border:"1px solid rgba(196,137,58,.4)",borderRadius:16,padding:"18px 20px"}}>
            <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.85)",marginBottom:6}}>✦ New · Tap to Pray</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",color:"white",lineHeight:1.35,marginBottom:8}}>
              Sometimes we all just need<br/><em style={{color:"var(--gold)"}}>someone to pray with us.</em>
            </div>
            <p style={{fontSize:".76rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.7,marginBottom:10}}>
              Touch your ring to your phone. A real voice from 2amcompanion.com prays with you -- right where you are. No app. No account. Just prayer.
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <span style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.3)",color:"rgba(255,255,255,.8)",fontSize:".65rem",padding:"4px 12px",borderRadius:50}}>📱 Works on most phones</span>
              <span style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.3)",color:"rgba(255,255,255,.8)",fontSize:".65rem",padding:"4px 12px",borderRadius:50}}>🔗 Links can be personalized</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* BLEND SHOWCASE */}
      <section id="sec-blends" className="sec sec-dark">
        <div className="sec-in">
          <div className="sh">
            <div className="sh-eye">From the Book</div>
            <h2 className="sh-h lt">The <em>Sip &amp; Heal</em> Blends</h2>
            <p className="sh-p lt">Click any blend to see the recipe. {BLENDS.length} wellness blends + {CLEANSING.length} cleansing protocols.</p>
          </div>
          <div className="b-showcase">
            {BLENDS.slice(0,8).map(b=>{
              const isExp = blendExpanded===b.id;
              return (
              <div key={b.id} className={`b-tile ${isExp?"b-tile-exp":""}`} onClick={()=>setBlendExpanded(isExp?null:b.id)}>
                <div className="b-tile-visual" style={{background:`linear-gradient(155deg,${b.color} 0%,${b.color}99 55%,#1C1A17 100%)`}}>
                  <img src={b.photo} alt={b.name} className="b-tile-photo"/>
                  <div className="b-tile-occ-badge">{b.occasion}</div>
                  {isExp && <button className="b-tile-close" onClick={e=>{e.stopPropagation();setBlendExpanded(null);}}>✕</button>}
                </div>
                <div className="b-tile-body">
                  <div className="b-name">{b.name}</div>
                  <div className="b-tag">{b.tagline}</div>
                  <div className="b-ben">{b.benefit}</div>
                  {isExp && (
                    <div className="b-tile-recipe">
                      <div className="b-recipe-desc">{b.desc}</div>
                      <div className="b-recipe-label">Ingredients</div>
                      <ul className="b-recipe-list">
                        {b.ingredients.map(i=><li key={i}>{i}</li>)}
                      </ul>
                      <div className="b-recipe-row">
                        <span className="b-recipe-meta">Steep {b.steepMin} min</span>
                        <span className="b-recipe-meta">{b.steepTemp.split("--")[0].trim()}</span>
                        <span className="b-recipe-meta">{b.servingSize} per cup</span>
                      </div>
                      {b.warning && <div className="b-recipe-warn">{b.warning}</div>}
                    </div>
                  )}
                  <div className="b-foot">
                    <span className="b-price">${b.price}</span>
                    <button className="btn-tile" onClick={e=>{e.stopPropagation();addToCart({...b,emoji:BLEND_EMOJIS[b.id]||"🍵"});}}>+ Cart</button>
                  </div>
                </div>
              </div>
            );})}
          </div>
          <div style={{textAlign:"center",marginTop:"1.5rem"}}>
            <button className="btn-ghost" style={{borderColor:"rgba(255,255,255,.25)",color:"rgba(255,255,255,.78)"}} onClick={()=>nav("shop")}>
              View All {BLENDS.length} Blends + {CLEANSING.length} Cleansing Protocols →
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}

      <div id="sec-story" className="philo">
        <div className="philo-vis"><p className="philo-quote">"Every herb was put here for a reason. Every cup is a conversation with what your body already knows."</p></div>
        <div className="philo-txt">
          <div className="sh"><div className="sh-eye">Our Story</div><h2 className="sh-h">Rooted in <em>healing</em></h2></div>
          <p className="philo-p">Chai Holistic was born from a simple belief: that healing is an everyday practice, not a destination. The Sip &amp; Heal collection brings together 40 carefully crafted recipes -- for sleepless 2am nights, energized mornings, deep seasonal cleanses, and everything in between.</p>
          <p className="philo-p">Every blend uses whole herbs, sourced with intention, and packed with the same love you'd get from a grandmother who knew exactly what you needed.</p>
          <div className="philo-sig">-- Chai Holistic</div>
        </div>
      </div>

      
      {/* TEA EDUCATION */}
      <section id="sec-tea" className="sec sec-linen">
        <div className="sec-in">
          <div className="sh c">
            <div className="sh-eye">Ancient Wisdom · Modern Science</div>
            <h2 className="sh-h">Why Tea is the <em>Greatest Gift</em><br/>the Earth Ever Gave Us</h2>
            <p className="sh-p" style={{maxWidth:560}}>For nearly five thousand years, across every culture on earth, tea has been medicine, ritual, comfort, and communion. Here is what the ancients knew — and what science is only beginning to confirm.</p>
          </div>

          {/* HISTORY CARDS */}
          <div style={{marginBottom:"2.5rem"}}>
            <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
              <div className="sh-eye" style={{display:"flex",justifyContent:"center"}}>5,000 Years of History</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.2rem,2vw,1.7rem)",color:"var(--bark)",fontWeight:400,margin:0}}>The Story of the <em>World's Most Beloved Drink</em></h3>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
              {[
                {year:"2737 BCE", emoji:"🍃", title:"The First Cup",
                 text:"Emperor Shen Nong discovered tea when leaves drifted into his boiling water. He documented its healing properties — a happy accident that changed the world."},
                {year:"~500 BCE", emoji:"📜", title:"Medicine Before Pleasure",
                 text:"Tea appears in ancient Chinese medical texts as a treatment for fatigue, poor eyesight, and digestion. For a thousand years, tea was prescribed by physicians."},
                {year:"760 CE",   emoji:"📖", title:"The Classic of Tea",
                 text:"Lu Yu writes Ch'a Ching — the first book ever written entirely about tea. His opening line: Tea is a drink fit for the most exalted."},
                {year:"1191 CE", emoji:"🏯", title:"Elixir of Life",
                 text:"Buddhist monk Eisai writes: Tea is the ultimate mental and medical remedy and has the ability to make one's life more full and complete."},
                {year:"1700s",   emoji:"🌍", title:"The World Discovers Tea",
                 text:"Tea becomes the most traded commodity on earth after spices. Wars are fought over it. The Boston Tea Party changes the course of history."},
                {year:"Today",   emoji:"🔬", title:"Science Catches Up",
                 text:"3.7 billion cups consumed every day. Modern research confirms what ancient healers always knew: tea contains compounds found nowhere else in nature."},
              ].map(item=>(
                <div key={item.year}
                  style={{background:"white",border:"1px solid var(--dust)",borderRadius:16,padding:"16px 18px",display:"flex",gap:12,alignItems:"flex-start",transition:"all .25s"}}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(28,26,23,.08)";e.currentTarget.style.borderColor="var(--sage)";}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="var(--dust)";}}>
                  <span style={{fontSize:"1.4rem",flexShrink:0,marginTop:2}}>{item.emoji}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--gold)",fontWeight:500,marginBottom:2}}>{item.year}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"var(--bark)",marginBottom:5}}>{item.title}</div>
                    <p style={{fontSize:".72rem",color:"#6A5F50",lineHeight:1.65,fontWeight:300,margin:0}}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SCIENCE CARDS */}
          <div style={{marginBottom:"2.5rem"}}>
            <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
              <div className="sh-eye" style={{display:"flex",justifyContent:"center"}}>What Science Has Confirmed</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.2rem,2vw,1.7rem)",color:"var(--bark)",fontWeight:400,margin:0}}>Tea Works. Here is <em>How.</em></h3>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
              {[
                {icon:"🧠",compound:"L-Theanine",title:"Calm Focus Without the Crash",
                 text:"Found almost exclusively in tea. Promotes alpha brainwave activity — relaxed alertness — without the crash of coffee."},
                {icon:"🛡",compound:"Polyphenols & EGCG",title:"The Most Powerful Antioxidants",
                 text:"Tea polyphenols neutralize free radicals that damage cells and accelerate aging, reducing inflammation at a cellular level."},
                {icon:"❤",compound:"Catechins",title:"The Heart's Best Friend",
                 text:"Studies across Japan, China, and Europe link regular tea consumption with lower cardiovascular risk and healthier blood pressure."},
                {icon:"🌱",compound:"Prebiotics",title:"Your Gut Remembers",
                 text:"Tea polyphenols feed beneficial gut bacteria. A healthy gut directly affects mood, immunity, energy, and cognitive function."},
                {icon:"💆",compound:"Cortisol Regulation",title:"Your Nervous System Thanks You",
                 text:"Regular tea drinkers have measurably lower cortisol after challenging tasks. The ritual itself is medicine no supplement can replicate."},
                {icon:"⏳",compound:"Longevity",title:"Five Thousand Years of Evidence",
                 text:"The cultures with the highest tea consumption consistently rank among the world's most long-lived. Five thousand years is not coincidence."},
              ].map(f=>(
                <div key={f.title}
                  style={{background:"white",border:"1px solid var(--dust)",borderRadius:16,padding:"16px 18px",display:"flex",gap:12,alignItems:"flex-start",transition:"all .25s"}}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(28,26,23,.08)";e.currentTarget.style.borderColor="var(--sage)";}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="var(--dust)";}}>
                  <span style={{fontSize:"1.4rem",flexShrink:0,marginTop:2}}>{f.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--sage-d)",fontWeight:500,marginBottom:2}}>{f.compound}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"var(--bark)",marginBottom:5}}>{f.title}</div>
                    <p style={{fontSize:".72rem",color:"#6A5F50",lineHeight:1.65,fontWeight:300,margin:0}}>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUOTES */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10,marginBottom:"2.5rem"}}>
            {[
              {quote:"Tea is the elixir of life.",
               who:"Eisai, Buddhist Monk — Japan, 1214 CE",
               context:"Eisai introduced tea to Japan after studying in China. He personally grew the first Japanese tea garden and wrote the first Japanese book on tea — as medicine."},
              {quote:"Tea tempers the spirits, harmonizes the mind, dispels lassitude and relieves fatigue, awakens thought and prevents drowsiness.",
               who:"Lu Yu — The Classic of Tea, 760 CE",
               context:"Lu Yu spent decades studying tea before writing Ch'a Ching — documenting not just preparation but the philosophy of tea as a path to well-being."},
              {quote:"If you are cold, tea will warm you. If you are too heated, it will cool you. If you are depressed, it will cheer you. If you are excited, it will calm you.",
               who:"William Gladstone — British Prime Minister, 1865",
               context:"Even Western statesmen understood what Asian healers had known for millennia. Tea meets the body where it is."},
            ].map(q=>(
              <div key={q.who} style={{background:"linear-gradient(135deg,var(--sage-d),#2D4A2D)",borderRadius:16,padding:"22px 24px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-10,right:-10,fontSize:"5rem",color:"rgba(255,255,255,.05)",fontFamily:"Georgia,serif",lineHeight:1}}>"</div>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",fontStyle:"italic",color:"white",lineHeight:1.7,marginBottom:12,position:"relative",zIndex:1}}>{q.quote}</p>
                <div style={{fontSize:".62rem",color:"rgba(255,255,255,.6)",letterSpacing:".08em",marginBottom:6,fontWeight:500}}>{q.who}</div>
                <div style={{fontSize:".7rem",color:"rgba(255,255,255,.45)",lineHeight:1.6,fontWeight:300}}>{q.context}</div>
              </div>
            ))}
          </div>

          {/* INVITATION */}
          <div style={{background:"linear-gradient(135deg,var(--bark),#2A1F15)",borderRadius:24,padding:"40px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"40px",flexWrap:"wrap",justifyContent:"center"}}>
              {/* Book cover */}
              <div style={{flexShrink:0,display:"flex",justifyContent:"center"}}>
                <BookCoverMockup size="md" />
              </div>

              {/* Text + CTA */}
              <div style={{flex:1,minWidth:260,textAlign:"left"}}>
                <div style={{fontSize:"2rem",marginBottom:12}}>🍵</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.4rem,2.5vw,2.1rem)",color:"white",marginBottom:12,lineHeight:1.3}}>
                  This is why I wrote the book.<br/><em style={{color:"var(--gold)"}}>Every cup is a conversation.</em>
                </div>
                <p style={{fontSize:".9rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.85,marginBottom:"1.8rem"}}>
                  I did not write the Sip &amp; Heal Collection to sell tea. I wrote it because I genuinely believe that a cup of the right herb, steeped with intention and drunk in stillness, is one of the most powerful things a human being can do for themselves. Five thousand years of humanity agrees with me.
                </p>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <button className="btn-book" onClick={()=>addToCart({id:"book1",name:"Sip and Heal: The Chai Holistic Collection",price:24.99,emoji:"📖"})}>
                    Get the Book — $24.99
                  </button>
                  <button className="btn-ghost" style={{borderColor:"rgba(255,255,255,.25)",color:"rgba(255,255,255,.8)"}} onClick={()=>nav("recipes")}>
                    Browse All 40 Recipes Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<section id="sec-bundles" className="sec sec-linen">
        <div className="sec-in">
          <div className="sh c"><div className="sh-eye">Best Value</div><h2 className="sh-h">Curated <em>Bundles</em></h2><p className="sh-p">Thoughtfully paired for every intention.</p></div>
          <div className="bgrid">
            {BUNDLES.slice(0,3).map(b=>(
              <div key={b.id} className="bcard">
                <div className="bcard-top"><div className="bcard-badge">{b.tag}</div><div className="bcard-name">{b.name}</div><div className="bcard-desc">{b.desc}</div></div>
                <div className="bcard-body">
                  <div className="bcard-lbl">What's inside</div>
                  <ul className="bcard-list">{b.includes.map(x=><li key={x}>{x}</li>)}</ul>
                  <div className="bcard-foot">
                    <div><div className="bcard-price">${b.price}</div><div className="bcard-save">Save ${b.savings.toFixed(2)}</div></div>
                    <button className="btn-bundle" onClick={()=>addToCart({...b})}>Add Bundle</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"1.4rem"}}>
            <button className="btn-ghost" onClick={()=>nav("shop")}>View All {BUNDLES.length} Bundles →</button>
          </div>
        </div>
      </section>

      {/* BREW TOOLS TEASER — home page spotlight */}
      <section id="sec-tools-home" className="sec sec-linen">
        <div className="sec-in">
          <div className="sh c">
            <div className="sh-eye">The Ritual Collection</div>
            <h2 className="sh-h">Brew <em>Tools</em></h2>
            <p className="sh-p">The vessel matters. Hold something beautiful in both hands and the ritual becomes medicine before the first sip.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16,marginBottom:"1.6rem"}}>
            {BREW_TOOLS.slice(0,3).map(t=>(
              <div key={t.id} style={{background:"white",border:"1px solid var(--dust)",borderRadius:18,overflow:"hidden",transition:"all .3s",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(28,26,23,.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
                onClick={()=>nav("shop")}>
                <div style={{width:"100%",height:160,overflow:"hidden",position:"relative"}}>
                  <img src={t.photo} alt={t.name}
                    onError={e=>{if(t.fallback)e.currentTarget.src=t.fallback;}}
                    style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.07)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";}}
                  />
                  <div style={{position:"absolute",top:10,left:10,background:"rgba(28,26,23,.7)",color:"rgba(255,255,255,.9)",fontSize:".5rem",letterSpacing:".14em",textTransform:"uppercase",padding:"3px 10px",borderRadius:50,backdropFilter:"blur(6px)"}}>{t.badge}</div>
                  <div style={{position:"absolute",bottom:8,right:10,fontSize:"1.3rem"}}>{t.emoji}</div>
                </div>
                <div style={{padding:"14px 16px"}}>
                  <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:4}}>{t.material}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"var(--bark)",marginBottom:3}}>{t.name}</div>
                  <div style={{fontSize:".72rem",fontStyle:"italic",color:"#8A7A6A",marginBottom:10,fontWeight:300}}>{t.tagline}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"var(--bark)"}}>${t.price.toFixed(2)}</span>
                    <button className="btn-add" style={{fontSize:".62rem"}} onClick={e=>{e.stopPropagation();addToCart({...t,type:"tool"});}}>+ Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            <button className="btn-ghost" onClick={()=>{nav("shop");setTimeout(()=>{const el=document.getElementById("sec-shop-tools");if(el)el.scrollIntoView({behavior:"smooth"});},120);}}>
              See All {BREW_TOOLS.length} Brew Tools →
            </button>
          </div>
        </div>
      </section>

      <section id="sec-rings-home" className="sec sec-dark">
        <div className="sec-in">
          {/* Cinematic ring hero banner */}
          <div style={{position:"relative",borderRadius:20,overflow:"hidden",marginBottom:"2.5rem",minHeight:220,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src="/rings/vibeshift.jpg" alt="Vibe Shift Ring" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 48%",zIndex:0}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(12,10,8,.9) 0%, rgba(12,10,8,.55) 50%, rgba(12,10,8,.75) 100%)",zIndex:1}}/>
            <div className="sh c" style={{position:"relative",zIndex:2,padding:"40px 24px",margin:0}}>
              <div className="sh-eye" style={{color:"rgba(196,137,58,.9)"}}>spiralinterrupt.com · 2amcompanion.com</div>
              <h2 className="sh-h lt">Vibe Shift <em>Rings</em></h2>
              <p className="sh-p lt" style={{maxWidth:560,margin:"0 auto"}}>Precision-engineered fidget rings for overthinkers, restless hands, and anyone who thinks better while moving. Looks like jewelry. Works like a reset. And every ring ships with something more.</p>
            </div>
          </div>
          <div style={{maxWidth:780,margin:"0 auto 2.5rem",background:"linear-gradient(135deg,rgba(45,74,45,.7),rgba(27,58,27,.9))",border:"1px solid rgba(196,137,58,.35)",borderRadius:20,padding:"28px 32px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"10rem",opacity:.04,pointerEvents:"none"}}>🙏</div>
            <div style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",marginBottom:10}}>✦ Every Ring Ships With This</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.3rem,2.5vw,1.8rem)",color:"white",lineHeight:1.3,marginBottom:12}}>
              Touch your ring. Hear a voice.<br/><em style={{color:"var(--gold)"}}>Pray together.</em>
            </div>
            <p style={{fontSize:".86rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.8,maxWidth:540,margin:"0 auto 16px"}}>
              Sometimes we all just need someone to pray with us. Tap your ring to any NFC-enabled phone and a real recorded voice from <strong style={{color:"rgba(255,255,255,.85)"}}>2amcompanion.com</strong> prays with you -- instantly, no app needed. Every link can be personalized to your occasion, your name, your prayer.
            </p>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
              {["📱 No app needed","🙏 Real recorded voice","🔗 Personalizable link","✦ Ships with every ring"].map(tag=>(
                <span key={tag} style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.28)",color:"rgba(255,255,255,.78)",fontSize:".68rem",padding:"5px 14px",borderRadius:50}}>{tag}</span>
              ))}
            </div>
            <button className="btn-feat" style={{fontSize:".72rem",padding:"11px 28px"}} onClick={()=>nav("rings")}>
              See the Full Prayer Collection on the Rings Page
            </button>
          </div>
          <div className="ringsgrid">
            {RINGS.slice(0,3).map(r=>(
              <div key={r.id} className="rng">
                {/* Ring photo */}
                <div style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
                  <div style={{
                    width:"110px",height:"110px",borderRadius:"50%",
                    overflow:"hidden",
                    border:"3px solid rgba(196,137,58,.4)",
                    position:"relative",boxShadow:"0 0 0 2px rgba(196,137,58,.2), 0 8px 32px rgba(0,0,0,.5)",
                    background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,.15), rgba(28,26,23,.9))",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    {r.photo
                      ? <img src={r.photo} alt={r.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
                      : <div style={{fontSize:"2.2rem",color:"rgba(255,255,255,.7)"}}>{r.symbol}</div>
                    }
                    <div style={{position:"absolute",top:"-2px",right:"-2px",width:"18px",height:"18px",background:"var(--gold)",borderRadius:"50%",border:"2px solid rgba(255,255,255,.2)"}}/>
                  </div>
                </div>
                <div className="rng-tag">{r.tagline}</div>
                <div className="rng-name">{r.name}</div><div className="rng-desc">{r.desc}</div>
                <div className="rng-mat">{r.material}</div>
                <div className="rng-foot"><span className="rng-price">{r.price.toFixed(2)}</span><button className="btn-rng" onClick={()=>{const d=RING_DESIGNS.find(x=>x.ringRef===r.id)||null;setRingConfig({ring:r});setRcStep(1);setRcDesign(d);setRcSize(null);setRcFreq(null);setRcOuterColor(null);setRcInnerColor(null);setRcOrderConfirmed(false);}}>Customize &amp; Buy</button></div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"1.8rem"}}>
            <button className="btn-ghost" style={{borderColor:"rgba(255,255,255,.2)",color:"rgba(255,255,255,.7)"}} onClick={()=>nav("rings")}>Explore All {RINGS.length} Rings ↗</button>
          </div>
        </div>
      </section>

      <section id="sec-brewing" className="sec sec-sage">
        <div className="sec-in">
          <div className="sh c">
            <div className="sh-eye">No Thermometer Needed</div>
            <h2 className="sh-h">Brewing Made <em>Simple</em></h2>
            <p className="sh-p">Three categories. Watch your kettle. That's all you need to brew any of our 40 blends perfectly.</p>
          </div>
          <TempGuide/>
        </div>
      </section>

      <section id="sec-faq-teaser" className="sec sec-linen">
        <div className="sec-in">
          <div className="sh c">
            <div className="sh-eye">Honest Answers</div>
            <h2 className="sh-h">Your Questions, <em>Answered</em></h2>
            <p className="sh-p">We know cautious buyers have real questions. So do first-timers. We've answered them all -- honestly.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12,marginBottom:"2rem"}}>
            {[
              {q:"Are these safe with my medications?",icon:"🛡"},
              {q:"Do herbal teas actually work?",icon:"✦"},
              {q:"How do I brew without a thermometer?",icon:"🍵"},
              {q:"What should I expect from a cleanse?",icon:"🌿"},
              {q:"Are your herbs organic and tested?",icon:"🌱"},
              {q:"What is your refund policy?",icon:"📦"},
            ].map(item=>(
              <div key={item.q} style={{background:"white",border:"1px solid var(--dust)",borderRadius:16,padding:"15px 18px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",transition:"all .2s"}}
                onClick={()=>nav("faq")}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--sage)";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--dust)";e.currentTarget.style.transform="translateY(0)";}}>
                <span style={{fontSize:"1.1rem",flexShrink:0}}>{item.icon}</span>
                <span style={{fontSize:".81rem",color:"var(--bark)",fontWeight:400,lineHeight:1.4}}>{item.q}</span>
                <span style={{color:"var(--sage-d)",marginLeft:"auto",flexShrink:0}}>→</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            <button className="btn-main" onClick={()=>nav("faq")}>Read All FAQs →</button>
          </div>
        </div>
      </section>

      <div className="book-cta">
        <h2>Sip &amp; Heal: <em>The Chai Holistic Collection</em></h2>
        <p>40 tea recipes -- 30 wellness blends + 10 cleansing protocols. The book that started it all.</p>
        <button className="btn-book" onClick={()=>addToCart({id:"book1",name:"Sip & Heal: The Chai Holistic Collection",price:24.99,emoji:"📖"})}>Get the Book -- $24.99</button>
      </div>
    </div>
  );
  }



  // --- BLEND DETAIL MODAL ---------------------------------------------------
  const BlendModal = ({ blend, onClose }) => {
    if (!blend) return null;
    const emoji = BLEND_EMOJIS[blend.id] || "🍵";
    const tempInfo = tempIcon(blend.steepTemp);
    const cupsTotal = (blend.oz || 2) * (blend.cupsPerOz || 10);
    const costPerCup = (blend.price / cupsTotal).toFixed(2);

    // Close on backdrop click
    const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

    // Close on Escape
    useEffect(() => {
      const handler = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // Lock body scroll while open
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }, []);

    return (
      <div className="bm-ov" onClick={handleBackdrop}>
        <div className="bm" role="dialog" aria-modal="true" aria-label={blend.name}>
          {/* HERO IMAGE */}
          <div className="bm-hero" style={{background:`linear-gradient(145deg,${blend.color} 0%,${blend.color}aa 60%,#1C1A17 100%)`}}>
            <img src={blend.photo} alt={blend.name} className="bm-hero-img" onError={e=>{e.currentTarget.style.opacity=0;}}/>
            <div className="bm-hero-grad"/>
            <div className="bm-hero-occ">{blend.occasion}</div>
            <button className="bm-close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          {/* COLOR STRIPE */}
          <div className="bm-stripe" style={{background:blend.color}}/>

          {/* BODY */}
          <div className="bm-body">
            {/* Title */}
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:4}}>
              <h2 className="bm-name">{emoji} {blend.name}</h2>
              <div style={{fontSize:"1.6rem",flexShrink:0,opacity:.65}}></div>
            </div>
            <div className="bm-tagline">"{blend.tagline}"</div>
            <p className="bm-desc">{blend.desc}</p>

            {/* BENEFIT TAGS */}
            <div className="bm-section-lbl">Benefits</div>
            <div className="bm-benefit">{blend.benefit}</div>

            {/* INGREDIENTS */}
            <div className="bm-section-lbl">What's Inside</div>
            <div className="bm-ingr-wrap">
              {blend.ingredients.map(ing => (
                <span key={ing} className="bm-ingr-chip">{ing}</span>
              ))}
            </div>

            {/* BREW GUIDE */}
            <div className="bm-section-lbl">Brewing Guide</div>
            <div className="bm-brew">
              <div className="bm-brew-tile">
                <div className="bm-brew-lbl">Steep Time</div>
                <div className="bm-brew-val">⏱ {blend.steepMin} minutes</div>
              </div>
              <div className="bm-brew-tile">
                <div className="bm-brew-lbl">Serving Size</div>
                <div className="bm-brew-val">{blend.servingSize || "1 tsp"}</div>
              </div>
              <div className="bm-brew-tile" style={{gridColumn:"span 2"}}>
                <div className="bm-brew-lbl">Water Temperature</div>
                <div className="bm-brew-val">
                  <span style={{color:tempInfo.color,marginRight:6}}>{tempInfo.icon}</span>
                  {blend.steepTemp}
                </div>
              </div>
            </div>

            {/* BEST FOR */}
            {blend.mood && (
              <>
                <div className="bm-section-lbl">Best For</div>
                <div className="bm-brew" style={{marginBottom:18}}>
                  <div className="bm-brew-tile">
                    <div className="bm-brew-lbl">When You Feel</div>
                    <div className="bm-brew-val">{blend.mood}</div>
                  </div>
                  <div className="bm-brew-tile">
                    <div className="bm-brew-lbl">Time of Day</div>
                    <div className="bm-brew-val" style={{textTransform:"capitalize"}}>{blend.time}</div>
                  </div>
                </div>
              </>
            )}

            {/* VALUE */}
            <div className="bm-value">
              <span style={{fontSize:"1.1rem"}}>🫖</span>
              <span>
                <strong style={{display:"block",fontSize:".72rem",color:"var(--sage-d)",marginBottom:1}}>
                  {cupsTotal} cups per bag · ${costPerCup} / cup
                </strong>
                <span style={{fontSize:".67rem",color:"#7A7060"}}>
                  {blend.oz || 2}oz · {blend.cupsPerOz || 10} cups per oz
                </span>
              </span>
            </div>

            {/* WARNING */}
            {blend.warning && (
              <div className="bm-warn">
                <strong>⚠ Safety Note</strong>
                {blend.warning}
              </div>
            )}

            {/* WHY ORDER OURS — main blend modal */}
            <div style={{background:"linear-gradient(135deg,#F5F0E4,#FAF7F0)",border:"1px solid rgba(196,137,58,.2)",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
              <div style={{fontSize:".56rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--gold)",marginBottom:8,fontWeight:600}}>✦ Why Order Ours?</div>
              <p style={{fontSize:".76rem",color:"#6A5A48",lineHeight:1.75,margin:"0 0 10px",fontWeight:300}}>
                Measurements are the easy part. What actually determines results is sourcing — where the herbs came from, how they were dried, and how fresh they are. We source every herb in this blend to a specific standard so you don't have to guess.
              </p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {["🌿 Sourced to a standard","⚗️ Same ratio every bag","💰 More economical than DIY","⏱ No measuring or sourcing"].map(t=>(
                  <span key={t} style={{background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.18)",borderRadius:20,padding:"4px 11px",fontSize:".63rem",color:"var(--gold)",fontFamily:"Jost,sans-serif"}}>{t}</span>
                ))}
              </div>
            </div>

            {/* SUPPLEMENT PAIRING */}
            {getSuppPairing(blend).length > 0 && (
              <div style={{background:"linear-gradient(135deg,#F0F7F0,#FAF8F3)",border:"1px solid rgba(74,114,80,.2)",borderRadius:14,padding:"13px 15px",marginBottom:16}}>
                <div style={{fontSize:".55rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:9,fontWeight:600}}>
                  💊 Complete Your Protocol
                </div>
                {getSuppPairing(blend).map(s=>(
                  <div key={s.name} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8,paddingBottom:8,borderBottom:"1px solid rgba(74,114,80,.1)"}}>
                    <span style={{fontSize:"1.1rem",flexShrink:0}}>{s.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:".72rem",color:"var(--sage-d)",fontWeight:600,marginBottom:2}}>{s.name}</div>
                      <div style={{fontSize:".68rem",color:"#6A7A6A",lineHeight:1.5,fontWeight:300}}>{s.why}</div>
                    </div>
                    <button onClick={()=>nav("supplements")} style={{flexShrink:0,background:"rgba(74,114,80,.1)",border:"1px solid rgba(74,114,80,.25)",color:"var(--sage-d)",borderRadius:20,padding:"4px 10px",fontSize:".6rem",letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer",whiteSpace:"nowrap"}}>
                      Learn More →
                    </button>
                  </div>
                ))}
                <div style={{fontSize:".62rem",color:"#9AAA9A",fontStyle:"italic",marginTop:4}}>
                  Tea and supplements work together — neither replaces the other.
                </div>
              </div>
            )}

            {/* FOOT */}
            <div className="bm-foot">
              <div>
                <div className="bm-price">${blend.price.toFixed(2)}</div>
                <div className="bm-cup-note">{blend.oz || 2}oz bag · approx {cupsTotal} cups</div>
              </div>
              <div style={{display:"flex",gap:8,marginLeft:"auto",flexWrap:"wrap",justifyContent:"flex-end"}}>
                <button className="btn-ghost" style={{fontSize:".65rem",padding:"9px 16px"}}
                  onClick={()=>{
                    onClose();
                    nav("recipes");
                  }}>
                  See Recipe
                </button>
                <button className="btn-add" style={{fontSize:".72rem",padding:"10px 22px"}}
                  onClick={()=>{
                    addToCart({...blend, emoji:"🍵"});
                    onClose();
                  }}>
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- SHOP -----------------------------------------------------------------
  const Shop = () => {
    return (
    <div id="sec-shop-top" className="page">
      <section className="sec">
        <div className="sec-in">
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:"1.5rem",justifyContent:"center"}}>
            <button className="btn-finder" onClick={()=>setFinderOpen(true)}>✦ Find My Tea</button>
            <button className="btn-ghost" onClick={()=>setRitualOpen(true)}>☀ Build My Ritual</button>
            <button className="btn-ghost" style={{borderColor:"#8B3A2A",color:"#8B3A2A"}} onClick={()=>setTrackerOpen(true)}>🌿 Cleanse Tracker</button>
          </div>
          <div id="sec-shop-blends" className="sh c"><div className="sh-eye">The Apothecary</div><h2 className="sh-h">All Tea <em>Blends</em> <span className="cbadge">{BLENDS.length}</span></h2><p className="sh-p">Every wellness blend from the Sip &amp; Heal book.</p></div>
          <div className="pills">
            {["All","Morning","Evening","Seasonal","Wellness"].map(f=><button key={f} className={`pill ${blendFilter===f?"on":""}`} onClick={()=>setBlendFilter(f)}>{f}</button>)}
          </div>
          <div className="pgrid">
            {filteredBlends.map(b=>(
              <div key={b.id} className="pcard" onClick={()=>setSelectedBlend(b)}>
                <div className="pcard-visual" style={{background:`linear-gradient(145deg,${b.color} 0%,${b.color}aa 60%,#2A1F15 100%)`}}>
                  <img src={b.photo} alt={b.name} className="pcard-photo"/>
                  <div className="pcard-visual-occ">{b.occasion}</div>
                </div>
                <div className="pcard-stripe" style={{background:b.color}}/>
                <div className="pcard-body">
                  <div className="pcard-occ">{b.occasion}</div>
                  <div className="pcard-name">{b.name}</div>
                  <div className="pcard-tag">{b.tagline}</div>
                  <div className="pcard-desc">{b.desc}</div>
                  <CupValue item={b}/>
                  <div className="pcard-ingr"><strong>Ingredients</strong>{b.ingredients.join(" · ")}</div>
                  <div className="pcard-benefit">{b.benefit}</div>
                  {b.warning && <div className="warn-block"><strong>⚠ Safety Note</strong>{b.warning}</div>}
                  <div style={{fontSize:".66rem",color:"#8A7A6A",marginBottom:"12px",display:"flex",alignItems:"center",gap:6}}>
                    <span>⏱ {b.steepMin} min</span>
                    <span style={{color:"rgba(0,0,0,.2)"}}>·</span>
                    <span style={{color:tempIcon(b.steepTemp).color,fontWeight:500}}>{tempIcon(b.steepTemp).icon} {tempIcon(b.steepTemp).label}</span>
                  </div>
                  <div className="pcard-foot">
                    <span className="pcard-price">${b.price}</span>
                    <button className="btn-add" onClick={e=>{e.stopPropagation();addToCart({...b,emoji:"🍵"});}}>Add to Basket</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-linen">
        <div className="sec-in">
          <div id="sec-shop-cleanse" className="sh c"><div className="sh-eye" style={{color:"#8B3A2A"}}>Liver · Kidney · Full Body</div><h2 className="sh-h">Cleansing <em>Protocols</em> <span className="cbadge" style={{background:"#F5E0DC",color:"#8B3A2A"}}>{CLEANSING.length}</span></h2><p className="sh-p">10 targeted cleansing protocols from the book. Each with a specific organ focus and daily protocol.</p></div>
          <div className="pills">
            {["All","Liver","Kidney","Lymphatic","Digestive","Blood","Full Body","Urinary"].map(o=><button key={o} className={`pill cleanse-pill ${organFilter===o?"on":""}`} onClick={()=>setOrganFilter(o)}>{o}</button>)}
          </div>
          <div className="cgrid">
            {filteredCleansing.map(c=>(
              <div key={c.id} className="ccard">
                <div className="ccard-top"><div className="ccard-organ">{c.organ} · Cleanse</div><div className="ccard-name">{c.name}</div><div className="ccard-tag">{c.tagline}</div></div>
                <div className="ccard-body">
                  <div className="ccard-desc">{c.desc}</div>
                  <CupValue item={c}/>
                  <div className="ccard-protocol"><strong>Protocol</strong>{c.protocol}</div>
                  <div className="ccard-ingr"><strong>Ingredients</strong>{c.ingredients.join(" · ")}</div>
                  {c.warning && <div className="warn-block"><strong>⚠ Safety Note</strong>{c.warning}</div>}
                  <div style={{fontSize:".66rem",color:"#8A7A6A",marginBottom:"12px",display:"flex",alignItems:"center",gap:6}}>
                    <span>⏱ {c.steepMin} min · {c.days}-day protocol</span>
                    <span style={{color:"rgba(0,0,0,.2)"}}>·</span>
                    <span style={{color:tempIcon(c.steepTemp).color,fontWeight:500}}>{tempIcon(c.steepTemp).icon} {tempIcon(c.steepTemp).label}</span>
                  </div>
                  <div className="ccard-foot">
                    <span className="ccard-price">${c.price}</span>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn-track" onClick={()=>{setActiveTracker(c.id);setTrackerOpen(true);}}>Track</button>
                      <button className="btn-add-c" onClick={()=>addToCart({...c,emoji:"✦"})}>Add</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="sec-in">
          <div id="sec-shop-herbs" className="sh c"><div className="sh-eye">Blend Your Own</div><h2 className="sh-h">Individual <em>Herbs</em> <span className="cbadge">{HERBS.length}</span></h2><p className="sh-p">All {HERBS.length} whole herbs used in our blends. Click any herb to see what it pairs well with.</p></div>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="Search by name or benefit..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          {herbPair && <div style={{background:"var(--gold-p)",border:"1.5px solid var(--gold)",borderRadius:14,padding:"10px 16px",marginBottom:"1.2rem",fontSize:".78rem",color:"var(--bark)"}}>Showing herbs that pair well with <strong>{herbPair}</strong> <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--sage-d)",marginLeft:8,fontSize:".72rem",textDecoration:"underline"}} onClick={()=>setHerbPair(null)}>Clear ✕</button></div>}
          <div className="hgrid">
            {(herbPair ? HERBS.filter(h=>h.name===herbPair||(HERBS.find(x=>x.name===herbPair) && HERBS.find(x=>x.name===herbPair).pairs && HERBS.find(x=>x.name===herbPair).pairs.includes(h.name))) : searchedHerbs).map(h=>(
              <div key={h.id} className={`hcard ${herbPair&&(h.name===herbPair||(HERBS.find(x=>x.name===herbPair) && HERBS.find(x=>x.name===herbPair).pairs && HERBS.find(x=>x.name===herbPair).pairs.includes(h.name)))&&h.name!==herbPair?"paired":""}`} onClick={()=>setHerbPair(h.name===herbPair?null:h.name)}>
                <div className="hcard-img"><img src={h.photo} alt={h.name} onError={e=>{e.currentTarget.src=h.fallback;}} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/></div>
                <div className="hcard-name">{h.name}</div>
                <div className="hcard-benefit">{h.benefit}</div>
                {h.pairs&&<div className="hcard-pairs">Pairs well with: {h.pairs.slice(0,2).join(", ")}</div>}
                <div className="hcard-foot">
                  <span className="hcard-price">${h.price}<span style={{fontSize:".64rem",color:"#8A7A6A"}}> / 2oz</span></span>
                  <button className="btn-herb" onClick={e=>{e.stopPropagation();addToCart({...h});}}>+ Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-linen">
        <div className="sec-in">
          <div id="sec-shop-bundles" className="sh c"><div className="sh-eye">Best Value</div><h2 className="sh-h">Bundle <em>&amp; Save</em> <span className="cbadge">{BUNDLES.length}</span></h2></div>
          <div className="bgrid">
            {BUNDLES.map(b=>(
              <div key={b.id} className="bcard">
                <div className="bcard-top"><div className="bcard-badge">{b.tag}</div><div className="bcard-name">{b.name}</div><div className="bcard-desc">{b.desc}</div></div>
                <div className="bcard-body">
                  <div className="bcard-lbl">What's inside</div>
                  <ul className="bcard-list">{b.includes.map(x=><li key={x}>{x}</li>)}</ul>
                  <div className="bcard-foot">
                    <div><div className="bcard-price">${b.price}</div><div className="bcard-save">Save ${b.savings.toFixed(2)}</div></div>
                    <button className="btn-bundle" onClick={()=>addToCart({...b})}>Add Bundle</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="sec-in">
          <div id="sec-shop-tools" className="sh c">
            <div className="sh-eye">The Ritual Collection</div>
            <h2 className="sh-h">Brew <em>Tools</em> <span className="cbadge">{BREW_TOOLS.length}</span></h2>
          </div>
          <div className="tools-intro">
            <p className="tools-intro-p">The vessel matters. The strainer matters. Holding something beautiful in both hands, feeling the warmth move through your palms before the first sip -- that is the ritual. These tools are chosen to make your tea practice feel like the act of love it is.</p>
          </div>
          <div className="tgrid">
            {BREW_TOOLS.map(t=>(
              <div key={t.id} className="tcard">
                <div className="tcard-visual">
                  <img className="tcard-photo" src={t.photo} alt={t.name} onError={e=>{if(t.fallback){e.currentTarget.src=t.fallback;}else{e.currentTarget.style.display='none';}}}/>
                  <div className="tcard-badge">{t.badge}</div>
                  <div className="tcard-emoji">{t.emoji}</div>
                </div>
                <div className="tcard-body">
                  <div className="tcard-material">{t.material}</div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-tagline">{t.tagline}</div>
                  <div className="tcard-desc">{t.desc}</div>
                  <div className="tcard-meta">
                    <span className="tcard-chip">{t.capacity}</span>
                    <span className="tcard-chip">Ritual: {t.ritual}</span>
                  </div>
                  <div className="tcard-care">{t.care}</div>
                  <div className="tcard-foot">
                    <span className="tcard-price">${t.price.toFixed(2)}</span>
                    <button className="btn-tool" onClick={()=>addToCart({...t,type:"tool"})}>Add to Basket</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
  }

  // --- RECIPES --------------------------------------------------------------
  const Recipes = () => {
    return (
    <div id="sec-rec-top" className="page">
      <section className="sec">
        <div className="sec-in">
          <div className="sh c"><div className="sh-eye">Sip &amp; Heal · Complete Guide</div><h2 className="sh-h">All <em>40 Recipes</em></h2><p className="sh-p">Click any recipe to expand steps and start your brew timer.</p></div>
          <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
            <button className="btn-finder" style={{marginRight:10}} onClick={()=>setFinderOpen(true)}>✦ Find My Tea</button>
            <button className="btn-ghost" onClick={()=>setRitualOpen(true)}>Build My Ritual</button>
          </div>
          <div style={{marginBottom:"2rem"}}>
            <h3 id="sec-rec-wellness" style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"var(--bark)",marginBottom:"1rem"}}>Wellness Blends <span className="cbadge">{BLENDS.length}</span></h3>
            <div className="pills">{["All","Morning","Evening","Seasonal","Wellness"].map(f=><button key={f} className={`pill ${blendFilter===f?"on":""}`} onClick={()=>setBlendFilter(f)}>{f}</button>)}</div>
            <div className="rgrid">
              {filteredBlends.map((r,i)=>{
                const idx=`w${i}`;const isOpen=activeRecipe===idx;
                return(
                  <div key={r.id} data-recipe={idx} className="rcard" onClick={()=>setActiveRecipe(idx)}>
                    <div className="rcard-hover-desc">{r.desc}</div>
                    <div className="rcard-head">
                      <div className="rcard-icon">{BLEND_EMOJIS[r.id]||"🍵"}</div>
                      <div>
                        <div className="rcard-name">{r.name}</div>
                        <div className="rcard-tag-sm">{r.occasion} · {r.steepMin} min</div>
                      </div>
                    </div>
                    <div className="rcard-meta"><span className="rtag occ">{r.mood}</span><span className="rtag time">{r.price}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 id="sec-rec-cleanse" style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"#8B3A2A",marginBottom:"1rem"}}>Cleansing Protocols <span className="cbadge" style={{background:"#F5E0DC",color:"#8B3A2A"}}>{CLEANSING.length}</span></h3>
            <div className="rgrid">
              {CLEANSING.map((r,i)=>{
                const idx=`c${i}`;const isOpen=activeRecipe===idx;
                return(
                  <div key={r.id} data-recipe={idx} className="rcard" onClick={()=>setActiveRecipe(idx)} style={isOpen?{borderColor:"#8B3A2A"}:{}}>
                    <div className="rcard-hover-desc">{r.desc}</div>
                    <div className="rcard-head">
                      <div className="rcard-icon" style={{background:"#F5E0DC"}}>🌿</div>
                      <div>
                        <div className="rcard-name" style={{color:"#8B3A2A"}}>{r.name}</div>
                        <div className="rcard-tag-sm" style={{color:"#8B3A2A"}}>{r.organ} · {r.steepMin} min</div>
                      </div>
                    </div>
                    <div className="rcard-meta"><span className="rtag" style={{background:"#F5E0DC",color:"#8B3A2A"}}>{r.mood}</span><span className="rtag time">{r.price}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <div className="book-cta">
        <h2>The Complete <em>Sip &amp; Heal</em> Collection</h2>
        <p>All 40 recipes in one beautifully crafted guide.</p>
        <button className="btn-book" onClick={()=>addToCart({id:"book1",name:"Sip & Heal: The Chai Holistic Collection",price:24.99,emoji:"📖"})}>Get the Book -- $24.99</button>
      </div>
    </div>
  );
  }


  // ── Recipe detail modal ────────────────────────────────────────────────────
  const RecipeModal = () => {
    if (!activeRecipe) return null;
    const isClean = activeRecipe.startsWith('c');
    const idx = parseInt(activeRecipe.slice(1));
    const r = isClean ? CLEANSING[idx] : BLENDS[idx];
    if (!r || !r.price) return null;
    const accent = isClean ? "#8B3A2A" : "var(--sage-d)";
    const accentBg = isClean ? "#F5E0DC" : "var(--sage-p)";
    return (
      <div style={{
        position:"fixed",inset:0,zIndex:850,
        background:"rgba(28,26,23,.75)",backdropFilter:"blur(10px)",
        display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",
      }} onClick={()=>setActiveRecipe(null)}>
        <div style={{
          background:"#FFFDF8",borderRadius:24,width:"100%",
          maxWidth:520,maxHeight:"88vh",overflowY:"auto",
          boxShadow:"0 32px 80px rgba(0,0,0,.4)",
        }} onClick={e=>e.stopPropagation()}>
          <div style={{
            background:`linear-gradient(135deg,${r.color||"#3D2B1F"},#1C1A17)`,
            borderRadius:"24px 24px 0 0",padding:"26px 26px 20px",position:"relative",
          }}>
            <button onClick={()=>setActiveRecipe(null)} style={{
              position:"absolute",top:14,right:14,background:"rgba(255,255,255,.15)",
              border:"none",borderRadius:"50%",width:32,height:32,color:"white",
              fontSize:"1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
            }}>✕</button>
            <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.55)",marginBottom:6}}>
              {r.occasion||r.organ} · {r.steepMin} min
            </div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.2rem,3vw,1.6rem)",color:"white",fontWeight:400,marginBottom:4}}>{r.name}</div>
            <div style={{fontSize:".78rem",color:"rgba(255,255,255,.6)",fontStyle:"italic"}}>{r.tagline||r.benefit}</div>
          </div>
          <div style={{padding:"22px 24px"}}>
            <CupValue item={r}/>
            <p style={{fontSize:".86rem",color:"#4A3F30",lineHeight:1.8,marginBottom:18,fontWeight:300}}>{r.desc}</p>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:accent,marginBottom:8,fontWeight:600}}>Ingredients</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {r.ingredients.map(h=>(
                  <span key={h} style={{background:accentBg,borderRadius:50,padding:"4px 12px",fontSize:".74rem",color:accent}}>{h}</span>
                ))}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              <div style={{background:"var(--linen)",borderRadius:12,padding:"12px 14px"}}>
                <div style={{fontSize:".58rem",letterSpacing:".12em",textTransform:"uppercase",color:"#8A7A6A",marginBottom:4}}>Steep Time</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"var(--bark)"}}>{r.steepMin} min</div>
              </div>
              <div style={{background:"var(--linen)",borderRadius:12,padding:"12px 14px"}}>
                <div style={{fontSize:".58rem",letterSpacing:".12em",textTransform:"uppercase",color:"#8A7A6A",marginBottom:4}}>Serving</div>
                <div style={{fontSize:".82rem",color:"var(--bark)"}}>{r.servingSize||"1 tsp"} per cup</div>
              </div>
            </div>
            {r.benefit&&<div style={{background:`linear-gradient(135deg,${accentBg},white)`,borderLeft:`4px solid ${accent}`,borderRadius:"0 12px 12px 0",padding:"10px 14px",marginBottom:16,fontSize:".78rem",color:accent,fontWeight:500}}>{r.benefit}</div>}
            {r.warning&&(
              <div style={{background:"rgba(255,180,0,.06)",border:"1px solid rgba(255,180,0,.25)",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:".74rem",color:"#8A6A00",lineHeight:1.65}}>
                <strong style={{display:"block",marginBottom:4}}>⚠ Safety Note</strong>{r.warning}
              </div>
            )}
            <div style={{display:"flex",gap:10,alignItems:"center",padding:"14px 16px",background:"var(--linen)",borderRadius:12,marginBottom:12,flexWrap:"wrap"}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",color:"var(--bark)",minWidth:60}}>
                {timerFor===activeRecipe&&timerSec!==null?fmt(timerSec):`${r.steepMin}:00`}
              </span>
              <button className={`btn-t ${timerOn&&timerFor===activeRecipe?"stop":"go"}`}
                onClick={()=>{if(timerOn&&timerFor===activeRecipe)stopTimer();else startTimer(r,activeRecipe);}}>
                {timerOn&&timerFor===activeRecipe?"Stop":"Start Brewing"}
              </button>
              {timerFor===activeRecipe&&timerSec!==null&&<button className="btn-t rst" onClick={e=>{e.stopPropagation();stopTimer();}}>Reset</button>}
            </div>
            <button className="btn-add" style={{width:"100%"}} onClick={()=>{addToCart({...r,emoji:"🍵"});setActiveRecipe(null);}}>
              Add to Basket — ${r.price}
            </button>

            {/* WHY ORDER OURS — recipe modal */}
            <div style={{marginTop:12,background:"linear-gradient(135deg,#F5F0E4,#FAF7F0)",border:"1px solid rgba(196,137,58,.2)",borderRadius:14,padding:"13px 15px"}}>
              <div style={{fontSize:".55rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--gold)",marginBottom:7,fontWeight:600}}>✦ Why Order Ours?</div>
              <p style={{fontSize:".74rem",color:"#6A5A48",lineHeight:1.7,margin:"0 0 9px",fontWeight:300}}>Measurements are the easy part. Results depend on sourcing — the grade, origin, and freshness of every herb. We source each one to a specific standard so the recipe works the way it should.</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {["🌿 Sourced to standard","⚗️ Consistent every batch","💰 More economical than DIY","⏱ No measuring or sourcing"].map(t=>(
                  <span key={t} style={{background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.18)",borderRadius:20,padding:"3px 10px",fontSize:".62rem",color:"var(--gold)"}}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- INTENTION ENGINE -----------------------------------------------------
  const INTENTION_STEPS = [
    {
      key:"name",
      q:"First -- what shall we call you?",
      sub:"Your Sip & Seek journey starts here. Everything is personal.",
      type:"text",
      placeholder:"Your first name",
    },
    {
      key:"feeling",
      q:"How are you feeling right now -- honestly?",
      sub:"No right or wrong. Sip & Seek meets you exactly where you are.",
      type:"choice",
      opts:[
        {v:"anxious",    l:"Anxious or overwhelmed",  e:"🌊"},
        {v:"tired",      l:"Tired and depleted",       e:"😪"},
        {v:"foggy",      l:"Foggy and unfocused",      e:"🌫"},
        {v:"sad",        l:"Heavy-hearted or grieving", e:"💙"},
        {v:"restless",   l:"Restless, can't settle",   e:"🌀"},
        {v:"stressed",   l:"Stressed and stretched",   e:"🔥"},
        {v:"hopeful",    l:"Hopeful and ready",        e:"🌱"},
        {v:"grateful",   l:"Grateful and present",     e:"✨"},
      ],
    },
    {
      key:"seeking",
      q:"What do you most need right now?",
      sub:"Trust your instinct. Your body already knows.",
      type:"choice",
      opts:[
        {v:"calm",       l:"Calm and stillness",       e:"🕊"},
        {v:"clarity",    l:"Mental clarity and focus", e:"💡"},
        {v:"strength",   l:"Strength and resilience",  e:"🌿"},
        {v:"healing",    l:"Physical healing",         e:"🌱"},
        {v:"rest",       l:"Deep rest and sleep",      e:"🌙"},
        {v:"courage",    l:"Courage and confidence",   e:"⚡"},
        {v:"connection", l:"Connection and love",      e:"❤"},
        {v:"release",    l:"To let something go",      e:"🍃"},
      ],
    },
    {
      key:"intention",
      q:"Set your Sip & Seek intention.",
      sub:"What do you want this cup to carry for you today?",
      type:"text",
      placeholder:"e.g. I choose peace. I begin again. I trust myself.",
    },
  ];

  // Affirmation library -- keyed by feeling + seeking
  const getAffirmation = (feeling, seeking, name) => {
    const n = name || "Friend";
    const map = {
      "anxious-calm":      `${n}, anxiety is not your identity -- it is a wave passing through you. This cup is an anchor. Breathe in slowly. You are safe in this moment.`,
      "anxious-clarity":   `${n}, beneath the noise is a still, clear place that has always known what to do. This cup helps you find your way back there. Breathe first. Then decide.`,
      "anxious-courage":   `${n}, courage is not the absence of fear -- it is continuing anyway. This cup stands with you. You have survived every hard day so far. This one is no different.`,
      "tired-strength":    `${n}, rest is not weakness -- it is the soil where strength grows. This cup asks nothing of you except that you receive it. You are allowed to be tired. You are still whole.`,
      "tired-rest":        `${n}, your body has been carrying so much. This cup is permission -- permission to put it all down for a few minutes and just breathe. Rest is productive. You matter enough to restore.`,
      "tired-healing":     `${n}, healing begins the moment you stop pushing and start listening to what your body is asking for. This cup is that conversation. Sip slowly. Your body knows the way.`,
      "foggy-clarity":     `${n}, clarity is already inside you -- fog is just temporary weather. This cup is a gentle wind. As you sip, let the noise settle. The answers you need will surface.`,
      "foggy-calm":        `${n}, when the mind is cloudy, the wisest thing to do is slow down. This cup invites you to stop trying to think your way through and simply be. Stillness is the cure for fog.`,
      "sad-healing":       `${n}, grief and tenderness are proof of how deeply you love. This cup holds space for all of it -- the sadness, the love, and the hope that is quietly waiting underneath. You are not alone.`,
      "sad-connection":    `${n}, even in your quietest, loneliest moments -- you are held. By this practice. By the intention behind every herb in this cup. By the part of you that chose to take care of yourself today.`,
      "sad-release":       `${n}, you are allowed to grieve what was, grieve what wasn't, and still believe in what is coming. This cup asks you to hold it all gently. Some things need to be felt before they can be released.`,
      "restless-calm":     `${n}, restlessness is energy looking for a home. This cup invites that energy to soften -- not disappear, but settle into something you can work with. Breathe. Root down. You are here.`,
      "restless-rest":     `${n}, the world will still be there after you rest. But you will be better equipped to meet it. This cup is a doorway into stillness. Walk through it. Everything else can wait.`,
      "stressed-release":  `${n}, you cannot pour from an empty vessel -- and you have been pouring for a long time. This cup is yours. Not for productivity, not for anyone else. Just for you. Release what you can. Keep breathing.`,
      "stressed-strength": `${n}, strength is not about having nothing left to carry. It is about knowing how to carry it differently. This cup is here to remind you that you are not alone in this, and that you are stronger than your stress.`,
      "stressed-calm":     `${n}, stress is the gap between where you are and where you think you should be. This cup closes that gap -- not by solving everything, but by reminding you that right here, right now, you are okay.`,
      "hopeful-clarity":   `${n}, hope is a powerful beginning -- and clarity makes it a plan. This cup is for the version of you who is ready to see things more clearly and move forward with intention. The path is unfolding.`,
      "hopeful-courage":   `${n}, something in you is ready. This cup honors that readiness. Whatever you're stepping toward -- it matters. You matter. Go slowly, go intentionally, and know that every beginning starts exactly where you are.`,
      "grateful-connection":`${n}, gratitude is one of the most powerful frequencies there is. This cup amplifies it. As you sip, let yourself feel genuinely thankful -- for your body, for this moment, for the simple miracle of being here.`,
      "grateful-release":  `${n}, when we are truly grateful, we can also truly release -- because we trust that more goodness is coming. This cup celebrates where you are, and gently makes space for what's next.`,
    };
    const key = `${feeling}-${seeking}`;
    return map[key] || `${n}, you chose to take care of yourself today -- and that is never a small thing. This cup was made for exactly this moment. Whatever you are carrying, you don't have to carry it alone. Sip slowly. Breathe deeply. You are exactly where you need to be.`;
  };

  // 7-day ritual based on blend + seeking
  const getRitual = (blend, seeking) => {
    const rituals = {
      calm:     ["Morning: Brew your cup before checking your phone. Sit for 5 minutes in silence.", "Midday: Take 3 deep breaths before each meal.", "Evening: Write one thing that brought you peace today.", "Before bed: Brew a second cup. Let yourself do nothing for 10 minutes.", "Daily: Walk outside barefoot for 2 minutes if possible.", "Weekly: Tell one person something you appreciate about them.", "Your mantra this week: 'I choose peace over urgency.'"],
      clarity:  ["Morning: Before your cup, write 3 things you want to accomplish today.", "Before decisions: Pause and ask 'What does my calm self think?'", "Evening: Review -- what worked? What needs changing?", "Daily: Remove one distraction from your environment.", "Digital: Set your phone face-down during focused work.", "Movement: A 10-minute walk clears mental fog better than coffee.", "Your mantra this week: 'I think clearly. I decide wisely.'"],
      strength: ["Morning: Name one strength you have that the day will need.", "Movement: Add 5 minutes of movement to your morning.", "Nourishment: Drink water before your tea -- your body is asking.", "Evening: Acknowledge one hard thing you did today without minimizing it.", "Boundaries: Say no to one thing this week that drains you.", "Rest: Strength is built in recovery -- sleep is non-negotiable.", "Your mantra this week: 'I am stronger than I believe.'"],
      healing:  ["Morning: Ask your body what it needs today -- and listen.", "Slow down: Eat one meal without screens this week.", "Hydrate: Add one extra glass of water each day.", "Sleep: Add 30 minutes of sleep -- your body heals at night.", "Gentle movement: Stretch for 5 minutes before bed.", "Nourish: Add one whole food to your daily intake.", "Your mantra this week: 'My body is wise. I am listening.'"],
      rest:     ["Evening: Begin your wind-down 30 minutes earlier tonight.", "Screen-free: No screens 45 minutes before bed.", "Temperature: Cool your room slightly -- better sleep guaranteed.", "Ritual: Brew your blend, dim the lights, and do nothing else.", "Journal: Write tomorrow's top 3 priorities tonight so your brain can let go.", "Breathe: Try 4-7-8 breathing: inhale 4, hold 7, exhale 8.", "Your mantra this week: 'Rest is sacred. I deserve to restore.'"],
      courage:  ["Morning: Write one thing you've been avoiding. Take one small step toward it.", "Affirmation: 'I am capable of more than I know.'", "Discomfort: Do one slightly uncomfortable thing today -- on purpose.", "Celebrate: Acknowledge every small win. Courage builds on itself.", "People: Reach out to someone you've been meaning to contact.", "Vision: Write where you want to be in 90 days.", "Your mantra this week: 'I act despite the fear. That is courage.'"],
      connection:["Morning: Think of someone you love before you get out of bed.", "Reach out: Send one message today just to say 'I'm thinking of you.'", "Presence: Put your phone away during your next conversation.", "Yourself: Do one kind thing for yourself today -- just because.", "Listen: Ask someone how they really are -- and wait for the real answer.", "Gratitude: Tell someone specifically what you appreciate about them.", "Your mantra this week: 'Love is the most powerful thing I can offer.'"],
      release:  ["Morning: Write what you want to release on paper. Then set it aside.", "Breathe: Long exhales release tension -- inhale 4, exhale 8.", "Body: Shake your hands and arms for 30 seconds. Release is physical.", "Forgiveness: Consider whether something is ready to be let go.", "Space: Clear one small area of clutter -- external space creates internal space.", "Evening: End each day by saying 'I did enough. I am enough.'", "Your mantra this week: 'I release what no longer serves me. I make room for what does.'"],
    };
    return rituals[seeking] || rituals.calm;
  };

  const buildIntentionResult = (data) => {
    const { name, feeling, seeking, intention } = data;
    // Find best matching blend
    const all = [...BLENDS, ...CLEANSING];
    const scored = all.map(b => ({
      ...b,
      score: (b.feeling === feeling ? 4 : 0) + (b.energy === (seeking === "rest" || seeking === "calm" ? "low" : seeking === "clarity" || seeking === "courage" ? "high" : "medium") ? 2 : 0)
    })).sort((a,b) => b.score - a.score);
    const blend = scored[0];
    const affirmation = getAffirmation(feeling, seeking, name);
    const ritual = getRitual(blend, seeking);
    setIntentionResult({ name, feeling, seeking, intention, blend, affirmation, ritual });
    setIntentionStep(99); // show result
  };

  const IntentionEngine = () => {
    const [localText, setLocalText] = useState("");
    const step = INTENTION_STEPS[intentionStep];
    const progress = Math.min(intentionStep / INTENTION_STEPS.length, 1);

    const handleNext = (val) => {
      const next = { ...intentionData, [step.key]: val };
      setIntentionData(next);
      if (intentionStep < INTENTION_STEPS.length - 1) {
        setIntentionStep(s => s + 1);
        setLocalText("");
      } else {
        buildIntentionResult(next);
      }
    };

    // Result card
    if (intentionStep === 99 && intentionResult) {
      const { name, intention, blend, affirmation, ritual } = intentionResult;
      return (
        <div className="modal-ov" onClick={()=>{}} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div className="modal" style={{maxWidth:680,background:"#FAF7F0"}} onClick={e=>e.stopPropagation()}>
            <div className="modal-head" style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",borderRadius:"24px 24px 0 0"}}>
              <div>
                <div style={{fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.5)",marginBottom:4}}>Your Intention Card</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"white"}}>For {name}</div>
              </div>
              <button className="modal-close" style={{borderColor:"rgba(255,255,255,.2)",color:"white"}} onClick={()=>{setIntentionOpen(false);setIntentionStep(0);setIntentionData({});setIntentionResult(null);}}>✕</button>
            </div>
            <div className="modal-body" style={{padding:0}}>

              {/* INTENTION STATEMENT */}
              <div style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",padding:"24px 28px",borderBottom:"none"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:".8rem",fontStyle:"italic",color:"rgba(255,255,255,.5)",marginBottom:8}}>Your intention today</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",color:"var(--gold)",lineHeight:1.4,fontStyle:"italic"}}>"{intention}"</div>
              </div>

              {/* AFFIRMATION */}
              <div style={{padding:"24px 28px",background:"#FAF7F0",borderBottom:"1px solid var(--dust)"}}>
                <div style={{fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:10,fontWeight:500}}>✦ A message for you</div>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:".98rem",color:"#3D2B1F",lineHeight:1.75,fontStyle:"italic"}}>{affirmation}</p>
              </div>

              {/* RECOMMENDED BLEND */}
              <div style={{padding:"20px 28px",background:"white",borderBottom:"1px solid var(--dust)"}}>
                <div style={{fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:10,fontWeight:500}}>🍵 Your cup for today</div>
                <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                  <div style={{background:`linear-gradient(135deg,${blend.color||"#3D2B1F"},#1C1A17)`,width:56,height:56,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",flexShrink:0}}>🍵</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"var(--bark)",marginBottom:3}}>{blend.name}</div>
                    <div style={{fontSize:".76rem",color:"#8A7A6A",marginBottom:8,fontStyle:"italic"}}>{blend.tagline}</div>
                    <div style={{fontSize:".72rem",color:"var(--gold)",marginBottom:10}}>{blend.benefit}</div>
                    <CupValue item={blend}/>
                    <button className="btn-add" style={{marginTop:8}} onClick={()=>{ addToCart({...blend,emoji:"🍵"}); }}>
                      Add to Basket -- ${blend.price}
                    </button>
                  </div>
                </div>
              </div>

              {/* 7-DAY RITUAL */}
              <div style={{padding:"20px 28px",background:"var(--sage-p)",borderBottom:"1px solid #C8DEC8"}}>
                <div style={{fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:12,fontWeight:500}}>☀ Your 7-Day Sip &amp; Seek Ritual</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {ritual.map((r,i) => (
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:22,height:22,background:"var(--sage-d)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".62rem",color:"white",fontWeight:600,flexShrink:0,marginTop:1}}>{i+1}</div>
                      <div style={{fontSize:".8rem",color:"#3D2B1F",lineHeight:1.55,fontWeight: i===6 ? 600 : 300,fontStyle: i===6 ? "italic" : "normal"}}>{r}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* THREE TOGETHER SECTION */}
              <div style={{padding:"24px 28px",background:"linear-gradient(160deg,#0E1A0E,#1A2E1A)",borderBottom:"1px solid rgba(196,137,58,.18)"}}>
                <div style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.75)",marginBottom:14,textAlign:"center"}}>✦ Complete Your Circle</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1rem,2vw,1.25rem)",color:"white",textAlign:"center",lineHeight:1.4,marginBottom:20}}>
                  The tea. The ring. The prayer.<br/><em style={{color:"var(--gold)"}}>Three things. One intention.</em>
                </div>
                {/* Three pillars */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
                  {[
                    {icon:"🍵", title:"The Tea", color:"#4A7250",
                      desc:"Your daily ritual. What heals your body, warms your spirit, and grounds your morning. You already have your blend."},
                    {icon:"💍", title:"The Ring", color:"#C4893A",
                      desc:"Your reminder. Spin it when the anxiety rises. A tactile anchor when your mind won't stop. Every ring ships ready to pray."},
                    {icon:"🙏", title:"The Prayer", color:"#3A4A7A",
                      desc:"Your companion. Touch your Vibe Shift Ring to your phone and a real voice from 2amcompanion.com prays with you — right now."},
                  ].map(p=>(
                    <div key={p.title} style={{background:"rgba(255,255,255,.04)",border:`1px solid ${p.color}44`,borderRadius:14,padding:"16px 12px",textAlign:"center"}}>
                      <div style={{fontSize:"1.6rem",marginBottom:8}}>{p.icon}</div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"white",marginBottom:6}}>{p.title}</div>
                      <div style={{fontSize:".7rem",color:"rgba(255,255,255,.5)",lineHeight:1.55,fontWeight:300}}>{p.desc}</div>
                    </div>
                  ))}
                </div>
                {/* 2amcompanion callout */}
                <div style={{background:"rgba(45,74,45,.5)",border:"1px solid rgba(196,137,58,.3)",borderRadius:14,padding:"16px 20px",textAlign:"center"}}>
                  <div style={{fontSize:".6rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",marginBottom:8}}>🙏 A Prayer Is Waiting For You</div>
                  <p style={{fontSize:".82rem",color:"rgba(255,255,255,.65)",fontWeight:300,lineHeight:1.75,marginBottom:12}}>
                    Sometimes we all just need someone to pray with us. At <strong style={{color:"rgba(255,255,255,.9)"}}>2amcompanion.com</strong> a real recorded voice meets you exactly where you are — whether it's 2am, a quiet Tuesday, or a moment of gratitude. You are not praying alone.
                  </p>
                  <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                    <button
                      onClick={()=>window.open("https://2amcompanion.com","_blank")}
                      style={{background:"rgba(196,137,58,.9)",border:"none",color:"white",padding:"10px 24px",borderRadius:50,fontFamily:"Jost,sans-serif",fontSize:".72rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",transition:"all .2s"}}>
                      Visit 2amcompanion.com →
                    </button>
                    <button
                      onClick={()=>{ setIntentionOpen(false); setIntentionStep(0); setIntentionData({}); setIntentionResult(null); nav("rings"); }}
                      style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.8)",padding:"10px 24px",borderRadius:50,fontFamily:"Jost,sans-serif",fontSize:".72rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",transition:"all .2s"}}>
                      💍 See Vibe Shift Rings
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div style={{padding:"20px 28px",background:"#FAF7F0",borderRadius:"0 0 24px 24px"}}>
                {/* Why Order Ours — intention engine */}
                <div style={{background:"linear-gradient(135deg,#F5F0E4,#FAF7F0)",border:"1px solid rgba(196,137,58,.2)",borderRadius:14,padding:"13px 15px",marginBottom:14}}>
                  <div style={{fontSize:".55rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--gold)",marginBottom:7,fontWeight:600}}>✦ Why Order Ours?</div>
                  <p style={{fontSize:".74rem",color:"#6A5A48",lineHeight:1.7,margin:"0 0 9px",fontWeight:300}}>We matched you to this blend for a reason. The results it promises depend on the quality of what goes into it — the sourcing, the freshness, the ratio. Ours are held to a specific standard so your ritual works the way it's meant to.</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {["🌿 Sourced to standard","⚗️ Consistent every batch","💰 More economical than DIY","⏱ Ready immediately"].map(t=>(
                      <span key={t} style={{background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.18)",borderRadius:20,padding:"3px 10px",fontSize:".62rem",color:"var(--gold)"}}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
                <button className="btn-main" onClick={()=>{ addToCart({...blend,emoji:"🍵"}); setIntentionOpen(false); setIntentionStep(0); setIntentionData({}); setIntentionResult(null); }}>
                  Add {blend.name} to Cart
                </button>
                <button className="btn-ghost" style={{fontSize:".72rem",padding:"10px 20px"}} onClick={()=>{ setIntentionStep(0); setIntentionData({}); setIntentionResult(null); }}>
                  Start Over
                </button>
                <button className="btn-ghost" style={{fontSize:".72rem",padding:"10px 20px"}} onClick={()=>{ setIntentionOpen(false); setIntentionStep(0); setIntentionData({}); setIntentionResult(null); window.open("https://2amcompanion.com","_blank"); }}>
                  🌙 2AM Companion
                </button>
                </div>
              </div>

              {/* FLOATING PRINT BUTTON */}
              {(()=>{
                const ritualRows = ritual.map((r,i)=>`
                  <div class="ritual-item">
                    <div class="ritual-num">${i+1}</div>
                    <div class="ritual-text${i===6?" last":""}">${r.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
                  </div>`).join("");

                const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your Sip &amp; Seek Card — ${name.replace(/</g,"&lt;")}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#EDE7DA;font-family:'Jost',sans-serif;padding:40px 20px 60px;color:#2D2010;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.card{max-width:580px;margin:0 auto;background:#FAF7F0;border-radius:22px;overflow:hidden;box-shadow:0 12px 50px rgba(0,0,0,.15);border:1px solid #D8CFBE}
.card-header{background:linear-gradient(135deg,#2D4A2D 0%,#1B3A1B 100%);padding:28px 32px 22px;display:flex;justify-content:space-between;align-items:flex-end}
.card-eyebrow{font-size:8.5px;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:6px}
.card-title{font-family:'Playfair Display',serif;font-size:1.45rem;color:white;font-weight:400}
.card-logo{font-family:'Playfair Display',serif;font-size:.72rem;color:rgba(255,255,255,.3);text-align:right;line-height:1.5}
.intention-band{background:linear-gradient(135deg,#2D4A2D 0%,#1B3A1B 100%);padding:0 32px 26px}
.intention-divider{height:1px;background:rgba(255,255,255,.1);margin-bottom:18px}
.intention-label{font-family:'Playfair Display',serif;font-size:.7rem;font-style:italic;color:rgba(255,255,255,.4);margin-bottom:8px}
.intention-text{font-family:'Playfair Display',serif;font-size:1.18rem;color:#C4893A;line-height:1.5;font-style:italic}
.section{padding:22px 32px;border-bottom:1px solid #EAE0D0}
.section-label{font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:#4A7250;font-weight:600;margin-bottom:12px}
.affirmation{font-family:'Playfair Display',serif;font-size:.95rem;color:#3D2B1F;line-height:1.8;font-style:italic}
.blend-row{display:flex;gap:14px;align-items:flex-start}
.blend-icon{width:50px;height:50px;background:linear-gradient(135deg,${(blend.color||"#3D2B1F").replace(/</g,"&lt;")},#1C1A17);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0}
.blend-name{font-family:'Playfair Display',serif;font-size:1.08rem;color:#2D2010;margin-bottom:3px}
.blend-tagline{font-size:.76rem;color:#8A7A6A;font-style:italic;margin-bottom:6px}
.blend-benefit{font-size:.7rem;color:#C4893A;font-weight:500}
.ritual-section{padding:22px 32px;background:#EEF5EE;border-bottom:1px solid #C8DEC8}
.ritual-grid{display:flex;flex-direction:column;gap:8px}
.ritual-item{display:flex;gap:10px;align-items:flex-start}
.ritual-num{width:21px;height:21px;background:#4A7250;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.6rem;color:white;font-weight:700;flex-shrink:0;margin-top:2px}
.ritual-text{font-size:.78rem;color:#3D2B1F;line-height:1.55;font-weight:300}
.ritual-text.last{font-weight:600;font-style:italic;color:#2D4A2D}
.footer-band{background:#2D4A2D;padding:16px 32px;display:flex;justify-content:space-between;align-items:center}
.footer-brand{font-family:'Playfair Display',serif;font-size:.82rem;color:rgba(255,255,255,.65)}
.footer-url{font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3)}
.print-wrap{max-width:580px;margin:28px auto 0;text-align:center}
.print-btn{background:#2D4A2D;color:white;border:none;padding:13px 36px;border-radius:50px;font-family:'Jost',sans-serif;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;box-shadow:0 4px 18px rgba(45,74,45,.35)}
.print-btn:hover{background:#3a5e3a}
.hint{margin-top:12px;font-size:.72rem;color:#8A7A6A;font-style:italic}
@media print{
  .print-wrap{display:none}
  @page{margin:14mm}
  body{background:#EDE7DA;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .card{box-shadow:none;border-radius:22px;border:1px solid #D8CFBE;overflow:hidden}
}
</style>
</head>
<body>
<div class="card">
  <div class="card-header">
    <div>
      <div class="card-eyebrow">Your Intention Card</div>
      <div class="card-title">For ${name.replace(/</g,"&lt;")}</div>
    </div>
    <div class="card-logo">Chai Holistic<br>Sip &amp; Seek</div>
  </div>
  <div class="intention-band">
    <div class="intention-divider"></div>
    <div class="intention-label">Your intention today</div>
    <div class="intention-text">&ldquo;${intention.replace(/</g,"&lt;")}&rdquo;</div>
  </div>
  <div class="section">
    <div class="section-label">✦ A message for you</div>
    <div class="affirmation">${affirmation.replace(/</g,"&lt;")}</div>
  </div>
  <div class="section">
    <div class="section-label">🍵 Your cup for today</div>
    <div class="blend-row">
      <div class="blend-icon">🍵</div>
      <div>
        <div class="blend-name">${blend.name.replace(/</g,"&lt;")}</div>
        <div class="blend-tagline">${(blend.tagline||"").replace(/</g,"&lt;")}</div>
        <div class="blend-benefit">${(blend.benefit||"").replace(/</g,"&lt;")}</div>
      </div>
    </div>
  </div>
  <div class="ritual-section">
    <div class="section-label">☀ Your 7-Day Sip &amp; Seek Ritual</div>
    <div class="ritual-grid">${ritualRows}</div>
  </div>
  <div class="footer-band">
    <div class="footer-brand">Chai Holistic</div>
    <div class="footer-url">chaiholistic.com · Sip &amp; Heal</div>
  </div>
</div>
<div class="print-wrap">
  <button class="print-btn" onclick="window.print()">🖨&nbsp; Print This Card</button>
  <div class="hint">Tip: choose &ldquo;Save as PDF&rdquo; to keep a digital copy</div>
</div>
</body>
</html>`;

                const openPrint = () => {
                  const blob = new Blob([html], {type:"text/html"});
                  const url  = URL.createObjectURL(blob);
                  const a    = document.createElement("a");
                  a.href = url; a.target = "_blank"; a.rel = "noopener";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  setTimeout(()=>URL.revokeObjectURL(url), 60000);
                };

                return (
                  <div style={{
                    position:"sticky", bottom:0, left:0, right:0,
                    zIndex:10,
                    padding:"12px 28px",
                    background:"linear-gradient(0deg,rgba(250,247,240,1) 70%,rgba(250,247,240,0))",
                    display:"flex", justifyContent:"center",
                  }}>
                    <div style={{position:"relative", display:"inline-block"}}>
                      <button
                        className="btn-ghost"
                        style={{
                          fontSize:".72rem", padding:"10px 22px",
                          display:"flex", alignItems:"center", gap:7,
                          background:"white",
                          border:"1.5px solid rgba(196,137,58,.45)",
                          color:"#3D2B1F",
                          boxShadow:"0 3px 14px rgba(0,0,0,.1)",
                          borderRadius:50,
                        }}
                        title="Opens your personalised card in a new tab — takes a moment to load the fonts"
                        onClick={openPrint}
                      >
                        <span style={{fontSize:"1rem"}}>🖨</span>
                        Print Your Intention Card
                      </button>
                      <div style={{
                        position:"absolute", bottom:"calc(100% + 8px)", left:"50%",
                        transform:"translateX(-50%)",
                        background:"#2D4A2D", color:"rgba(255,255,255,.82)",
                        fontSize:".65rem", letterSpacing:".04em",
                        padding:"6px 12px", borderRadius:8, whiteSpace:"nowrap",
                        pointerEvents:"none",
                        opacity:0,
                        transition:"opacity .2s ease",
                      }}
                      className="print-tooltip"
                      >
                        Opens in a new tab — fonts may take a moment to load
                        <span style={{position:"absolute",bottom:-4,left:"50%",transform:"translateX(-50%)",width:8,height:8,background:"#2D4A2D",clipPath:"polygon(0 0,100% 0,50% 100%)"}}/>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      );
    }

    // Quiz steps
    return (
      <div className="modal-ov" onClick={()=>{}} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div className="modal" style={{maxWidth:580}} onClick={e=>e.stopPropagation()}>
          <div className="modal-head" style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",borderRadius:"24px 24px 0 0"}}>
            <div>
              <div style={{fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.5)",marginBottom:4}}>The Sip &amp; Seek</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"white"}}>Find yourself through your cup</div>
            </div>
            <button className="modal-close" style={{borderColor:"rgba(255,255,255,.2)",color:"white"}} onClick={()=>{setIntentionOpen(false);setIntentionStep(0);setIntentionData({});setIntentionResult(null);}}>✕</button>
          </div>
          <div className="modal-body">
            {/* Progress bar */}
            <div style={{height:3,background:"var(--dust)",borderRadius:3,marginBottom:"1.6rem",overflow:"hidden"}}>
              <div style={{height:"100%",background:"linear-gradient(90deg,var(--sage-d),var(--gold))",borderRadius:3,width:`${progress*100}%`,transition:"width .4s ease"}}/>
            </div>

            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"var(--bark)",marginBottom:6,lineHeight:1.3}}>{step.q}</div>
            <div style={{fontSize:".82rem",color:"#8A7A6A",fontWeight:300,marginBottom:"1.4rem",fontStyle:"italic"}}>{step.sub}</div>

            {step.type === "text" ? (
              <div>
                <input
                  style={{width:"100%",padding:"12px 16px",border:"1.5px solid var(--dust)",borderRadius:12,fontFamily:"Jost,sans-serif",fontSize:"1rem",color:"var(--bark)",outline:"none",background:"white",marginBottom:"1rem"}}
                  placeholder={step.placeholder}
                  value={localText}
                  onChange={e=>setLocalText(e.target.value)}
                  onKeyDown={e=>{ if(e.key==="Enter"&&localText.trim()) handleNext(localText.trim()); }}
                  autoFocus
                />
                <button className="btn-main" style={{width:"100%"}} disabled={!localText.trim()} onClick={()=>handleNext(localText.trim())}>
                  Continue →
                </button>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {step.opts.map(opt=>(
                  <div key={opt.v}
                    style={{background:"white",border:"1.5px solid var(--dust)",borderRadius:14,padding:"14px",cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:10}}
                    onClick={()=>handleNext(opt.v)}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--sage-d)";e.currentTarget.style.background="var(--sage-p)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--dust)";e.currentTarget.style.background="white";}}>
                    <span style={{fontSize:"1.4rem",flexShrink:0}}>{opt.e}</span>
                    <span style={{fontSize:".82rem",color:"var(--bark)",fontWeight:400,lineHeight:1.3}}>{opt.l}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Show welcome after 1.8 seconds on first visit
  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const dismissWelcome = (startSipSeek = false) => {
    setShowWelcome(false);
    try { localStorage.setItem('chai_welcome_seen', 'true'); } catch {}
    setWelcomeSeen(true);
    if (startSipSeek) {
      setTimeout(() => {
        setIntentionOpen(true);
        setIntentionStep(0);
        setIntentionData({});
        setIntentionResult(null);
      }, 300);
    }
  };

  // --- RING CONFIGURATOR ----------------------------------------------------
  // Designs updated to match actual Vibe Shift Ring collection
  const FREQUENCIES = [
    { hz:174, name:"The Foundation",       badge:"174 Hz", desc:"Security · Grounding · Pain Relief",
      detail:"The lowest of the sacred tones. Creates a deep sense of safety, reduces pain, and builds a foundation beneath everything you carry. For those who need to feel held." },
    { hz:285, name:"Quantum Field",        badge:"285 Hz", desc:"Healing · Energy Field · Restoration",
      detail:"Influences the body's energy field. Used across healing traditions to restore and rejuvenate at an energetic level — the frequency of cellular renewal." },
    { hz:396, name:"Liberation",           badge:"396 Hz", desc:"Release Fear · Clear Guilt · Ground",
      detail:"Clears the weight of guilt and deep-seated fear. The frequency of liberation — helping release what holds you back from living in your full truth." },
    { hz:417, name:"Transformation",       badge:"417 Hz", desc:"Change · Undo Trauma · Begin Again",
      detail:"The frequency of facilitated change. Helps clear difficult situations and opens the energetic field for a genuine new beginning." },
    { hz:528, name:"The Love Frequency",   badge:"528 Hz", desc:"Miracle · Heart · Repair",
      detail:"Called the Love Frequency by researchers and healers worldwide. Associated with heart coherence, deep cellular restoration, and the energy of transformation and miracles." },
    { hz:639, name:"Connection",           badge:"639 Hz", desc:"Relationship · Harmony · Intuition",
      detail:"The frequency of human connection — harmonizing relationships, opening the heart, and awakening the intuition that tells you who you can trust." },
    { hz:741, name:"The Awakener",         badge:"741 Hz", desc:"Truth · Expression · Clarity",
      detail:"Amplifies honest self-expression and mental clarity. A frequency that helps dissolve confusion and align your words, thoughts, and actions with your truth." },
    { hz:852, name:"Spiritual Return",     badge:"852 Hz", desc:"Inner Strength · Order · Intuition",
      detail:"Returns the spirit to its natural order. Deepens intuition, strengthens inner knowing, and reconnects you with the highest version of yourself." },
    { hz:963, name:"Divine Consciousness", badge:"963 Hz", desc:"Enlightenment · Crown · Oneness",
      detail:"The highest of the nine. The frequency of pure consciousness, divine connection, and fully awakened awareness. For those who know there is more." },
  ];

  const RING_SIZES = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const RingConfigurator = () => {
    const { ring } = ringConfig;

    // RING MODEL CHOOSER — shows when no ring is pre-selected
    if (!ring) {
      return (
        <div className="modal-ov" onClick={()=>setRingConfig(null)} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div id="ring-config-modal" className="modal" style={{maxWidth:620,background:"#0E0E0E",border:"1px solid rgba(255,255,255,.08)"}} onClick={e=>e.stopPropagation()}>
            <div className="modal-head" style={{background:"#0E0E0E",borderBottom:"1px solid rgba(255,255,255,.08)",borderRadius:"24px 24px 0 0"}}>
              <div>
                <div style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:4}}>Vibe Shift Rings</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"white"}}>Choose Your Ring</div>
              </div>
              <button className="modal-close" style={{borderColor:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.6)"}} onClick={()=>setRingConfig(null)}>✕</button>
            </div>
            <div style={{padding:"0 0 24px"}}>
              {/* Group collection photo */}
              <div style={{position:"relative",overflow:"hidden",maxHeight:200}}>
                <img
                  src={imgSre6}
                  alt="Vibe Shift Rings Collection"
                  style={{width:"100%",maxHeight:200,objectFit:"cover",objectPosition:"center",display:"block",filter:"brightness(.75)"}}
                />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,rgba(14,14,14,.9) 100%)"}}/>
                <div style={{position:"absolute",bottom:16,left:0,right:0,textAlign:"center"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontStyle:"italic",color:"rgba(255,255,255,.8)"}}>Select the model you desire</div>
                </div>
              </div>
              {/* Ring model grid */}
              <div style={{padding:"20px 24px 0"}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12}}>
                  {RINGS.map(r=>(
                    <div key={r.id}
                      onClick={()=>{const d=RING_DESIGNS.find(x=>x.ringRef===r.id)||null;setRingConfig({ring:r});setRcStep(1);setRcDesign(d);setRcSize(null);setRcFreq(null);setRcOuterColor(null);setRcInnerColor(null);setRcOrderConfirmed(false);}}
                      style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"all .25s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.09)";e.currentTarget.style.borderColor="rgba(196,137,58,.4)";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";}}>
                      <div style={{height:130,overflow:"hidden",position:"relative"}}>
                        {r.photo
                          ? <img src={r.photo} alt={r.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",transition:"transform .3s"}}
                              onMouseEnter={e=>{e.target.style.transform="scale(1.05)";}}
                              onMouseLeave={e=>{e.target.style.transform="scale(1)";}}/>
                          : <div style={{width:"100%",height:"100%",background:"rgba(255,255,255,.03)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",color:"rgba(255,255,255,.2)"}}>{r.symbol}</div>
                        }
                        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(14,14,14,.7) 100%)"}}/>
                      </div>
                      <div style={{padding:"10px 12px"}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"white",marginBottom:2}}>{r.name}</div>
                        <div style={{fontSize:".65rem",color:"rgba(196,137,58,.7)",marginBottom:4}}>{r.tagline}</div>
                        <div style={{fontSize:".62rem",color:"rgba(255,255,255,.35)"}}>{r.price.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const selectedDesign = rcDesign;
    const setSelectedDesign = setRcDesign;
    const selectedSize = rcSize;
    const setSelectedSize = setRcSize;
    const step = rcStep;
    const setStep = setRcStep;

    const canContinue = step === 1 ? !!selectedDesign : step === 2 ? (!!rcOuterColor && !!rcInnerColor) : step === 3 ? (!!rcPrayerLink && (rcPrayerLink.type==='default' || rcPrayerLink.verified)) : step === 4 ? !!rcFreq : step === 5 ? !!selectedSize : true;
    const scrollConfigToEnd = () => {
      const scroll = () => { const m=document.getElementById('ring-config-modal'); if(m) m.scrollTop=m.scrollHeight; };
      setTimeout(scroll, 50);
      setTimeout(scroll, 200);
    };
    const scrollToConfirm = (id) => {
      const scrollEl = () => {
        const el = document.getElementById(id);
        const modal = document.getElementById('ring-config-modal');
        if(el && modal) {
          const elTop = el.offsetTop;
          modal.scrollTo({ top: elTop - 24, behavior: 'smooth' });
        }
      };
      setTimeout(scrollEl, 60);
      setTimeout(scrollEl, 200);
      setTimeout(scrollEl, 400);
    };

    const handleAddToCart = () => {
      const linkCharge = rcPrayerLink&&rcPrayerLink.type==='custom' ? 6 : 0;
      const item = {
        ...ring,
        id: `${ring.id}-${selectedDesign.id}-${selectedSize}`,
        name: `${ring.name}`,
        price: ring.price + linkCharge,
        subtitle: `${selectedDesign.name} · ${rcOuterColor?rcOuterColor.name:""} / ${rcInnerColor?rcInnerColor.name:""} · Size ${selectedSize}`,
        material: `${selectedDesign.name} · Outer: ${rcOuterColor?rcOuterColor.name:""} · Inner: ${rcInnerColor?rcInnerColor.name:""} · ${rcFreq?rcFreq.hz+"Hz ":""} Meridian Infused · Size ${selectedSize}`,
        companionLink: rcPrayerLink,
        companionUrl: rcPrayerLink&&rcPrayerLink.type==='custom' ? rcLinkUrl : null,
        emoji: "◎",
        design: selectedDesign,
        frequency: rcFreq,
        size: selectedSize,
      };
      addToCart(item, "ring");
      setRingConfig(null);
    };

    return (
      <div className="modal-ov" onClick={() => setRingConfig(null)} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div id="ring-config-modal" className="modal" style={{maxWidth:560,background:"#0E0E0E",border:"1px solid rgba(255,255,255,.08)"}} onClick={e=>e.stopPropagation()}>

          {/* Header */}
          <div className="modal-head" style={{background:"#0E0E0E",borderBottom:"1px solid rgba(255,255,255,.08)",borderRadius:"24px 24px 0 0"}}>
            <div>
              <div style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:4}}>Configure Your Ring</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"white"}}>{ring.name}</div>
            </div>
            <button className="modal-close" style={{borderColor:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.6)"}} onClick={()=>setRingConfig(null)}>✕</button>
          </div>

          <div style={{padding:"24px 28px",background:"#0E0E0E",borderRadius:"0 0 24px 24px"}}>

            {/* Ring preview — real product photo + color swatches */}
            <div style={{display:"flex",alignItems:"center",gap:16,padding:"16px",background:"rgba(255,255,255,.04)",borderRadius:16,marginBottom:"1.5rem",border:"1px solid rgba(255,255,255,.06)"}}>
              {/* Product photo — shows selected design's ring if one is chosen */}
              {(()=>{const previewPhoto=(selectedDesign&&selectedDesign.ringRef)?RINGS.find(r=>r.id===selectedDesign.ringRef)?.photo:ring.photo;return(
              <div style={{width:72,height:72,borderRadius:"50%",overflow:"hidden",flexShrink:0,
                border:"2px solid rgba(196,137,58,.4)",
                boxShadow:"0 0 0 4px rgba(196,137,58,.1)",
                background:"rgba(255,255,255,.05)",transition:"all .3s"}}>
                {previewPhoto
                  ? <img src={previewPhoto} alt={selectedDesign?selectedDesign.name:ring.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
                  : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",color:"rgba(255,255,255,.3)"}}>{ring.symbol}</div>
                }
              </div>
              );})()}
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"white",marginBottom:2}}>{ring.name}</div>
                <div style={{fontSize:".68rem",color:"rgba(255,255,255,.35)",marginBottom:6}}>{ring.tagline}</div>
                {/* Color swatches — shown as reference once chosen */}
                {(rcOuterColor||rcInnerColor||rcFreq||rcSize)&&(
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {rcOuterColor&&(
                      <span style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,.06)",padding:"2px 8px",borderRadius:50,border:"1px solid rgba(255,255,255,.08)"}}>
                        <div style={{width:9,height:9,borderRadius:"50%",background:rcOuterColor.hex,border:"1px solid rgba(255,255,255,.15)",flexShrink:0}}/>
                        <span style={{fontSize:".55rem",color:"rgba(255,255,255,.55)",whiteSpace:"nowrap"}}>Outer: {rcOuterColor.name}</span>
                      </span>
                    )}
                    {rcInnerColor&&(
                      <span style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,.06)",padding:"2px 8px",borderRadius:50,border:"1px solid rgba(255,255,255,.08)"}}>
                        <div style={{width:9,height:9,borderRadius:"50%",background:rcInnerColor.hex,border:"1px solid rgba(255,255,255,.15)",flexShrink:0}}/>
                        <span style={{fontSize:".55rem",color:"rgba(255,255,255,.55)",whiteSpace:"nowrap"}}>Inner: {rcInnerColor.name}</span>
                      </span>
                    )}
                    {rcFreq&&(
                      <span style={{display:"flex",alignItems:"center",gap:4,background:"rgba(196,137,58,.1)",padding:"2px 8px",borderRadius:50}}>
                        <span style={{fontSize:".55rem",color:"rgba(196,137,58,.8)",whiteSpace:"nowrap"}}>{rcFreq.hz}Hz</span>
                      </span>
                    )}
                    {rcSize&&(
                      <span style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,.06)",padding:"2px 8px",borderRadius:50}}>
                        <span style={{fontSize:".55rem",color:"rgba(255,255,255,.55)"}}>Sz {rcSize}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div style={{marginLeft:"auto",fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"var(--gold)",flexShrink:0}}>${ring.price.toFixed(2)}</div>
            </div>

            {/* Step indicator */}
            <div style={{display:"flex",gap:8,marginBottom:"1.4rem"}}>
              {["Design","Colors","Link","Frequency","Size","Confirm"].map((s,i)=>(
                <div key={s} style={{flex:1,textAlign:"center"}}>
                  <div style={{height:3,borderRadius:3,background:step>i?"var(--gold)":step===i+1?"rgba(196,137,58,.4)":"rgba(255,255,255,.08)",marginBottom:4,transition:"all .3s"}}/>
                  <div style={{fontSize:".6rem",letterSpacing:".08em",textTransform:"uppercase",color:step===i+1?"rgba(196,137,58,.8)":"rgba(255,255,255,.2)"}}>{s}</div>
                </div>
              ))}
            </div>

            {/* STEP 1   Design */}
            {step === 1 && (
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"white",marginBottom:4}}>Design Style</div>
                <div style={{fontSize:".74rem",color:"rgba(255,255,255,.4)",marginBottom:"1rem",fontWeight:300}}>Choose the pattern that speaks to you. Each style is precision-crafted and spins freely around the inner band.</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:"1.4rem"}}>
                  {RING_DESIGNS.map(d=>(
                    <div key={d.id}
                      onClick={()=>{setSelectedDesign(d);scrollToConfirm('design-confirm');}}
                      style={{
                        display:"flex",alignItems:"center",gap:12,padding:"12px 14px",
                        background: (selectedDesign ? selectedDesign.id : null)===d.id ? "rgba(196,137,58,.12)" : "rgba(255,255,255,.04)",
                        border: (selectedDesign ? selectedDesign.id : null)===d.id ? "1.5px solid rgba(196,137,58,.6)" : "1px solid rgba(255,255,255,.08)",
                        borderRadius:14,cursor:"pointer",transition:"all .2s"
                      }}
                    >
                      {/* Ring style photo or color circle fallback */}
                      {(()=>{ const rp = d.ringRef ? RINGS.find(r=>r.id===d.ringRef) : null; return (
                        <div style={{width:44,height:44,borderRadius:"50%",flexShrink:0,overflow:"hidden",
                          border:`2px solid ${d.hex}88`,boxShadow:`0 2px 10px ${d.hex}44`}}>
                          {rp&&rp.photo
                            ? <img src={rp.photo} alt={d.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
                            : <div style={{width:"100%",height:"100%",background:d.hex,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".6rem",color:"rgba(255,255,255,.5)"}}>?</div>
                          }
                        </div>
                      );})()}
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:".8rem",color:"white",fontWeight:(selectedDesign ? selectedDesign.id : null)===d.id?600:400,marginBottom:2}}>{d.name}</div>
                        <div style={{fontSize:".65rem",color:"rgba(255,255,255,.35)",lineHeight:1.3}}>{d.desc}</div>
                      </div>
                      {(selectedDesign ? selectedDesign.id : null)===d.id && <div style={{color:"var(--gold)",fontSize:"1rem",flexShrink:0}}>✓</div>}
                    </div>
                  ))}
                </div>
                {/* Inline continue after design selection */}
                {selectedDesign&&(
                  <div id="design-confirm" style={{display:"flex",alignItems:"center",gap:12,background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.3)",borderRadius:12,padding:"12px 16px",marginTop:4}}>
                    {(()=>{const rp=selectedDesign.ringRef?RINGS.find(r=>r.id===selectedDesign.ringRef):null;return(
                      <div style={{width:40,height:40,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:"2px solid rgba(196,137,58,.5)"}}>
                        {rp&&rp.photo
                          ?<img src={rp.photo} alt={selectedDesign.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                          :<div style={{width:"100%",height:"100%",background:selectedDesign.hex,borderRadius:"50%"}}/>
                        }
                      </div>
                    );})()}
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:".62rem",color:"rgba(196,137,58,.8)",letterSpacing:".08em"}}>Design Selected</div>
                      <div style={{fontSize:".85rem",color:"white",fontWeight:500}}>{selectedDesign.name}</div>
                    </div>
                    <button
                      onClick={()=>setStep(s=>s+1)}
                      style={{background:"var(--gold)",color:"white",border:"none",padding:"10px 22px",borderRadius:50,fontSize:".72rem",fontFamily:"Jost,sans-serif",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
                      Continue →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2   Colors */}
            {step === 2 && (
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"white",marginBottom:4}}>Choose your ring colors</div>
                <div style={{fontSize:".74rem",color:"rgba(255,255,255,.4)",marginBottom:"1.2rem",fontWeight:300,lineHeight:1.6}}>
                  Pick colors for the outer spinning band and inner band independently. Same color for a solid look — different colors for a bold two-tone effect.
                </div>

                {/* LIVE PREVIEW */}
                <div style={{display:"flex",justifyContent:"center",marginBottom:"1.4rem"}}>
                  <div style={{position:"relative",width:90,height:90}}>
                    <div style={{position:"absolute",inset:0,borderRadius:"50%",background:rcOuterColor?rcOuterColor.hex:"rgba(255,255,255,.1)",transition:"background .3s"}}/>
                    <div style={{position:"absolute",inset:14,borderRadius:"50%",background:rcInnerColor?rcInnerColor.hex:"rgba(255,255,255,.05)",transition:"background .3s"}}/>
                    <div style={{position:"absolute",inset:28,borderRadius:"50%",background:"#0E0E0E"}}/>
                  </div>
                </div>

                {/* OUTER COLOR */}
                {/* AS SHOWN — top option, most prominent */}
                <div
                  onClick={()=>{setRcOuterColor({name:"As Shown",hex:null,asShown:true});setRcInnerColor({name:"As Shown",hex:null,asShown:true});scrollConfigToEnd();}}
                  style={{
                    display:"flex",alignItems:"center",gap:14,padding:"14px 16px",
                    background:rcOuterColor&&rcOuterColor.asShown?"rgba(196,137,58,.18)":"rgba(255,255,255,.05)",
                    border:rcOuterColor&&rcOuterColor.asShown?"2px solid rgba(196,137,58,.7)":"1px solid rgba(255,255,255,.12)",
                    borderRadius:14,cursor:"pointer",marginBottom:"1.2rem",transition:"all .2s"
                  }}>
                  {/* Ring thumbnail */}
                  <div style={{width:52,height:52,borderRadius:"50%",overflow:"hidden",flexShrink:0,
                    border:"2px solid rgba(196,137,58,.3)"}}>
                    {ring.photo
                      ? <img src={ring.photo} alt={ring.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                      : <div style={{width:"100%",height:"100%",background:"rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.3)"}}>{ring.symbol}</div>
                    }
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"white",marginBottom:3}}>
                      Order As Shown
                    </div>
                    <div style={{fontSize:".74rem",color:"rgba(255,255,255,.5)",fontWeight:300,lineHeight:1.5}}>
                      Get exactly what you see in the photo — no color changes, no decisions.
                    </div>
                  </div>
                  <div style={{
                    width:22,height:22,borderRadius:"50%",flexShrink:0,
                    background:rcOuterColor&&rcOuterColor.asShown?"var(--gold)":"rgba(255,255,255,.08)",
                    border:rcOuterColor&&rcOuterColor.asShown?"none":"1.5px solid rgba(255,255,255,.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:".7rem",color:"white"
                  }}>{rcOuterColor&&rcOuterColor.asShown?"✓":""}</div>
                </div>

                {/* Inline continue when Order As Shown is selected */}
                {rcOuterColor&&rcOuterColor.asShown&&(
                  <div style={{display:"flex",alignItems:"center",gap:14,background:"linear-gradient(135deg,rgba(45,74,45,.5),rgba(27,58,27,.7))",border:"1px solid rgba(196,137,58,.4)",borderRadius:14,padding:"14px 16px",marginBottom:"1.2rem"}}>
                    <div style={{width:48,height:48,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:"2px solid rgba(196,137,58,.4)"}}>
                      {ring.photo
                        ? <img src={ring.photo} alt={ring.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                        : <div style={{width:"100%",height:"100%",background:"rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.3)"}}>{ring.symbol}</div>
                      }
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:".6rem",letterSpacing:".12em",textTransform:"uppercase",color:"rgba(196,137,58,.85)",marginBottom:2}}>✓ Colors Confirmed</div>
                      <div style={{fontSize:".82rem",color:"white",fontWeight:500}}>{ring.name} — As Shown</div>
                    </div>
                    <button
                      onClick={()=>setStep(s=>s+1)}
                      style={{background:"var(--gold)",color:"white",border:"none",padding:"10px 22px",borderRadius:50,fontSize:".72rem",fontFamily:"Jost,sans-serif",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
                      Continue →
                    </button>
                  </div>
                )}

                {/* DIVIDER */}
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem"}}>
                  <div style={{flex:1,height:1,background:"rgba(255,255,255,.08)"}}/>
                  <span style={{fontSize:".6rem",color:"rgba(255,255,255,.25)",letterSpacing:".1em",textTransform:"uppercase"}}>Or customize your colors</span>
                  <div style={{flex:1,height:1,background:"rgba(255,255,255,.08)"}}/>
                </div>

                <div style={{opacity:rcOuterColor&&rcOuterColor.asShown?.35:1,transition:"opacity .2s",pointerEvents:rcOuterColor&&rcOuterColor.asShown?"none":"all"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <div style={{fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",fontWeight:500,flex:1}}>
                    Outer Band {rcOuterColor&&!rcOuterColor.asShown&&<span style={{color:"white"}}> — {rcOuterColor.name}</span>}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:"1.4rem"}}>
                  {[
                    {name:"Matte Black",hex:"#1A1A2A"},{name:"Electric Blue",hex:"#1A6ACA"},
                    {name:"Deep Purple",hex:"#7A1ACA"},{name:"Forest Green",hex:"#1A6A3A"},
                    {name:"Olive Gold",hex:"#8A8A1A"},{name:"Ghost White",hex:"#E8E4DC"},
                    {name:"Crimson Red",hex:"#CA1A1A"},{name:"Sunset Orange",hex:"#CA6A1A"},
                  ].map(function(col){return (
                    <div key={col.name+"o"}
                      onClick={()=>{setRcOuterColor(col);scrollToConfirm('inner-band-section');}}
                      style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                        padding:"10px 4px",borderRadius:12,cursor:"pointer",
                        background:rcOuterColor&&rcOuterColor.name===col.name?"rgba(196,137,58,.15)":"rgba(255,255,255,.04)",
                        border:rcOuterColor&&rcOuterColor.name===col.name?"1.5px solid rgba(196,137,58,.7)":"1px solid rgba(255,255,255,.1)",
                        transition:"all .2s"}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:col.hex,border:"2px solid rgba(255,255,255,.15)"}}/>
                      <div style={{fontSize:".56rem",color:"rgba(255,255,255,.55)",textAlign:"center",lineHeight:1.3}}>{col.name}</div>
                      {rcOuterColor&&rcOuterColor.name===col.name&&<div style={{color:"var(--gold)",fontSize:".7rem"}}>✓</div>}
                    </div>
                  );})}
                </div>

                {/* INNER COLOR */}
                <div id="inner-band-section" style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <div style={{fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",fontWeight:500,flex:1}}>
                    Inner Band {rcInnerColor&&<span style={{color:"white"}}> — {rcInnerColor.name}</span>}
                  </div>
                  <button onClick={()=>{setRcInnerColor(rcOuterColor);scrollToConfirm('color-confirm');}} disabled={!rcOuterColor}
                    style={{background:"none",border:"1px solid rgba(196,137,58,.3)",color:"rgba(196,137,58,.7)",
                      padding:"2px 10px",borderRadius:50,fontSize:".6rem",cursor:"pointer",
                      fontFamily:"Jost,sans-serif",opacity:rcOuterColor?1:.4}}>
                    Same as outer
                  </button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:"1rem"}}>
                  {[
                    {name:"Matte Black",hex:"#1A1A2A"},{name:"Electric Blue",hex:"#1A6ACA"},
                    {name:"Deep Purple",hex:"#7A1ACA"},{name:"Forest Green",hex:"#1A6A3A"},
                    {name:"Olive Gold",hex:"#8A8A1A"},{name:"Ghost White",hex:"#E8E4DC"},
                    {name:"Crimson Red",hex:"#CA1A1A"},{name:"Sunset Orange",hex:"#CA6A1A"},
                  ].map(function(col){return (
                    <div key={col.name+"i"}
                      onClick={()=>{setRcInnerColor(col);scrollToConfirm('color-confirm');}}
                      style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                        padding:"10px 4px",borderRadius:12,cursor:"pointer",
                        background:rcInnerColor&&rcInnerColor.name===col.name?"rgba(196,137,58,.15)":"rgba(255,255,255,.04)",
                        border:rcInnerColor&&rcInnerColor.name===col.name?"1.5px solid rgba(196,137,58,.7)":"1px solid rgba(255,255,255,.1)",
                        transition:"all .2s"}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:col.hex,border:"2px solid rgba(255,255,255,.15)"}}/>
                      <div style={{fontSize:".56rem",color:"rgba(255,255,255,.55)",textAlign:"center",lineHeight:1.3}}>{col.name}</div>
                      {rcInnerColor&&rcInnerColor.name===col.name&&<div style={{color:"var(--gold)",fontSize:".7rem"}}>✓</div>}
                    </div>
                  );})}
                </div>

                {rcOuterColor&&rcInnerColor&&!rcOuterColor.asShown&&rcOuterColor.name===rcInnerColor.name&&(
                  <div style={{fontSize:".72rem",color:"rgba(196,137,58,.9)",textAlign:"center",padding:"8px",background:"rgba(196,137,58,.08)",borderRadius:10}}>
                    ✓ Solid {rcOuterColor.name} — both bands matching
                  </div>
                )}
                </div> {/* end opacity wrapper */}
              </div>
            )}

            {/* STEP 3   Companion Link */}
            {step === 3 && (
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"white",marginBottom:4}}>Your Ring's Companion Link</div>
                <div style={{fontSize:".74rem",color:"rgba(255,255,255,.4)",marginBottom:"1.2rem",fontWeight:300,lineHeight:1.6}}>
                  Every Vibe Shift Ring ships ready to connect. Touch it to any phone and a page opens instantly — no app needed.
                </div>

                {/* OPTION 1: Default */}
                <div onClick={()=>{setRcPrayerLink({type:'default',url:null,verified:true});setRcLinkUrl('');setRcLinkTestShown(false);setRcLinkAttempts(0);scrollConfigToEnd();}}
                  style={{display:"flex",alignItems:"flex-start",gap:14,padding:"14px 16px",
                    background:rcPrayerLink&&rcPrayerLink.type==='default'?"rgba(45,74,45,.5)":"rgba(255,255,255,.04)",
                    border:rcPrayerLink&&rcPrayerLink.type==='default'?"1.5px solid rgba(196,137,58,.7)":"1px solid rgba(255,255,255,.1)",
                    borderRadius:14,cursor:"pointer",marginBottom:10,transition:"all .2s"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,marginTop:1,
                    background:rcPrayerLink&&rcPrayerLink.type==='default'?"var(--gold)":"rgba(255,255,255,.08)",
                    border:rcPrayerLink&&rcPrayerLink.type==='default'?"none":"1.5px solid rgba(255,255,255,.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",color:"white"}}>
                    {rcPrayerLink&&rcPrayerLink.type==='default'?"✓":""}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"white",marginBottom:3}}>🙏 2amcompanion.com Prayer Library</div>
                    <div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)",lineHeight:1.6,fontWeight:300}}>Ships connected to a living library of recorded prayers. Touch your ring, hear a voice, pray together. Ready the moment it arrives — no setup needed.</div>
                    <div style={{fontSize:".62rem",color:"rgba(196,137,58,.7)",marginTop:4,fontWeight:500}}>Included with every ring</div>
                  </div>
                </div>

                {/* OPTION 2: Custom Link */}
                <div onClick={()=>{if(!rcPrayerLink||rcPrayerLink.type!=='custom')setRcPrayerLink({type:'custom',url:'',verified:false});}}
                  style={{display:"flex",alignItems:"flex-start",gap:14,padding:"14px 16px",
                    background:rcPrayerLink&&rcPrayerLink.type==='custom'?"rgba(196,137,58,.08)":"rgba(255,255,255,.04)",
                    border:rcPrayerLink&&rcPrayerLink.type==='custom'?"1.5px solid rgba(196,137,58,.5)":"1px solid rgba(255,255,255,.1)",
                    borderRadius:14,cursor:"pointer",marginBottom:14,transition:"all .2s"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,marginTop:1,
                    background:rcPrayerLink&&rcPrayerLink.type==='custom'?"var(--gold)":"rgba(255,255,255,.08)",
                    border:rcPrayerLink&&rcPrayerLink.type==='custom'?"none":"1.5px solid rgba(255,255,255,.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",color:"white"}}>
                    {rcPrayerLink&&rcPrayerLink.type==='custom'?"✓":""}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"white"}}>🔗 Personalized Companion Link</div>
                      <span style={{background:"rgba(196,137,58,.2)",color:"rgba(196,137,58,.9)",fontSize:".58rem",padding:"2px 8px",borderRadius:50,fontWeight:600}}>+ $6.00</span>
                    </div>
                    <div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)",lineHeight:1.6,fontWeight:300}}>Connect to any page — your Spotify playlist, a personal prayer, a family video, anything you want your ring to open.</div>
                  </div>
                </div>

                {/* Custom URL input section */}
                {rcPrayerLink&&rcPrayerLink.type==='custom'&&(
                  <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:"16px"}}>
                    <div style={{fontSize:".66rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",marginBottom:10,fontWeight:500}}>Enter Your Link</div>
                    <LinkUrlInput
                      onCommit={url=>{setRcLinkUrl(url);setRcPrayerLink({type:'custom',url,verified:false});setRcLinkTestShown(true);}}
                    />

                    {/* Did it work? */}
                    {rcLinkTestShown&&!(rcPrayerLink&&rcPrayerLink.verified)&&rcLinkUrl&&(
                      <div style={{background:"rgba(255,255,255,.05)",borderRadius:10,padding:"12px 14px",marginBottom:10}}>
                        <div style={{fontSize:".74rem",color:"rgba(255,255,255,.7)",marginBottom:8}}>Did your link open correctly?</div>
                        <div style={{display:"flex",gap:8}}>
                          <button onClick={()=>{setRcPrayerLink({type:'custom',url:rcLinkUrl,verified:true});setRcLinkAttempts(0);scrollConfigToEnd();}}
                            style={{flex:1,background:"rgba(45,74,45,.6)",border:"1px solid rgba(196,137,58,.4)",color:"white",padding:"9px",borderRadius:10,fontFamily:"Jost,sans-serif",fontSize:".7rem",cursor:"pointer"}}>
                            ✓ Yes, it worked
                          </button>
                          <button onClick={()=>{setRcLinkAttempts(n=>n+1);setRcLinkTestShown(false);}}
                            style={{flex:1,background:"rgba(139,58,42,.3)",border:"1px solid rgba(139,58,42,.4)",color:"rgba(255,255,255,.7)",padding:"9px",borderRadius:10,fontFamily:"Jost,sans-serif",fontSize:".7rem",cursor:"pointer"}}>
                            ✗ No, it didn't work
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Verified confirmation */}
                    {rcPrayerLink&&rcPrayerLink.verified&&(
                      <div style={{background:"rgba(45,74,45,.4)",border:"1px solid rgba(196,137,58,.3)",borderRadius:10,padding:"10px 14px",marginBottom:10,fontSize:".72rem",color:"rgba(196,137,58,.9)"}}>
                        ✓ Link verified — your ring will open this page when touched.
                      </div>
                    )}

                    {/* After 3 failed attempts */}
                    {rcLinkAttempts >= 3 && !(rcPrayerLink&&rcPrayerLink.verified) && (
                      <div style={{background:"rgba(139,58,42,.2)",border:"1px solid rgba(139,58,42,.4)",borderRadius:12,padding:"14px 16px"}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"white",marginBottom:6}}>Still having trouble?</div>
                        <div style={{fontSize:".72rem",color:"rgba(255,255,255,.55)",lineHeight:1.6,marginBottom:12}}>No worries — that happens. You have two options:</div>
                        <div style={{display:"flex",flexDirection:"column",gap:8}}>
                          <button onClick={()=>{setRcPrayerLink({type:'default',url:null,verified:true});setRcLinkUrl('');setRcLinkAttempts(0);scrollConfigToEnd();}}
                            style={{background:"rgba(45,74,45,.5)",border:"1px solid rgba(196,137,58,.35)",color:"white",padding:"10px 14px",borderRadius:10,fontFamily:"Jost,sans-serif",fontSize:".72rem",cursor:"pointer",textAlign:"left"}}>
                            🙏 Use the default prayer library — ship my ring today
                          </button>
                          <button onClick={()=>{
                            const subject = encodeURIComponent("Custom Companion Link — Vibe Shift Ring Order");
                            const body = encodeURIComponent(`Hi Chai Holistic,

I'm placing an order for a Vibe Shift Ring and would like a custom companion link.

The link I want to use: ${rcLinkUrl}

Please help me get this set up before my ring ships.

Thank you!`);
                            window.open("mailto:hello@chaiholistic.com?subject="+subject+"&body="+body,"_blank");
                          }}
                            style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.7)",padding:"10px 14px",borderRadius:10,fontFamily:"Jost,sans-serif",fontSize:".72rem",cursor:"pointer",textAlign:"left"}}>
                            ✉ Email us your link — we'll set it up before shipping
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Spotify instructions */}
                    <details style={{marginTop:12}}>
                      <summary style={{fontSize:".66rem",color:"rgba(196,137,58,.7)",cursor:"pointer",letterSpacing:".06em",listStyle:"none",display:"flex",alignItems:"center",gap:6}}>
                        <span>▸</span> How to get your Spotify playlist link
                      </summary>
                      <div style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"12px 14px",marginTop:8}}>
                        {["Open Spotify on your phone or computer","Go to the playlist you want to share","Tap the three dots (⋮) or right-click the playlist","Select Share → Copy link to playlist","Paste that link in the box above"].map((step,i)=>(
                          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"4px 0",fontSize:".7rem",color:"rgba(255,255,255,.55)"}}>
                            <span style={{color:"var(--gold)",flexShrink:0,fontWeight:600}}>{i+1}.</span>{step}
                          </div>
                        ))}
                        <div style={{fontSize:".65rem",color:"rgba(255,255,255,.3)",marginTop:8,fontStyle:"italic"}}>Works for YouTube, personal websites, prayer pages, or any web address.</div>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4   Frequency Selection */}
            {step === 4 && (
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"white",marginBottom:4}}>Choose your Meridian Frequency</div>
                <div style={{fontSize:".74rem",color:"rgba(255,255,255,.45)",marginBottom:"1.2rem",fontWeight:300,lineHeight:1.6}}>
                  Each ring is infused with one of nine sacred frequencies during our proprietary Meridian Infusion process — chosen by Hz, aligned to intention. Choose the frequency that speaks to what you need most.
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:"1.2rem"}}>
                  {FREQUENCIES.map(f=>(
                                        <div key={f.hz} className="freq-wrap">
                      <div className="freq-rA"/>
                      <div className="freq-rB"/>
                      <div className="freq-rC"/>
                      <div
                        onClick={()=>{setRcFreq(f);scrollToConfirm('freq-confirm');}}
                        style={{
                          display:"flex",gap:14,alignItems:"flex-start",padding:"12px 14px",
                          background:rcFreq&&rcFreq.hz===f.hz?"rgba(196,137,58,.15)":"rgba(255,255,255,.04)",
                          border:rcFreq&&rcFreq.hz===f.hz?"1.5px solid rgba(196,137,58,.7)":"1px solid rgba(255,255,255,.08)",
                          borderRadius:12,cursor:"pointer"
                        }}>

                      <div style={{flexShrink:0,textAlign:"center",minWidth:52}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"var(--gold)",fontWeight:600}}>{f.hz}</div>
                        <div style={{fontSize:".5rem",color:"rgba(196,137,58,.6)",letterSpacing:".08em",textTransform:"uppercase"}}>Hz</div>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:".88rem",color:"white",fontWeight:rcFreq&&rcFreq.hz===f.hz?600:400,marginBottom:2}}>{f.name}</div>
                        <div style={{fontSize:".68rem",color:"var(--gold)",marginBottom:4,opacity:.85}}>{f.desc}</div>
                        <div style={{fontSize:".72rem",color:"rgba(255,255,255,.4)",lineHeight:1.55,fontWeight:300}}>{f.detail}</div>
                      </div>
                      {rcFreq&&rcFreq.hz===f.hz&&<div style={{color:"var(--gold)",fontSize:"1rem",flexShrink:0,marginTop:2}}>✓</div>}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Inline confirmation + continue after frequency selection */}
                {rcFreq&&(
                  <div id="freq-confirm" style={{marginBottom:"0.8rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(196,137,58,.1)",border:"1px solid rgba(196,137,58,.3)",borderRadius:12,padding:"12px 16px",marginBottom:10}}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:"var(--gold)",flexShrink:0}}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:".65rem",color:"rgba(196,137,58,.8)",letterSpacing:".08em"}}>Frequency Selected</div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"white"}}>{rcFreq.hz} Hz — {rcFreq.name}</div>
                        <div style={{fontSize:".62rem",color:"rgba(255,255,255,.4)",marginTop:1}}>{rcFreq.desc}</div>
                      </div>
                      <button
                        onClick={()=>setStep(s=>s+1)}
                        style={{background:"var(--gold)",color:"white",border:"none",padding:"10px 22px",borderRadius:50,fontSize:".72rem",fontFamily:"Jost,sans-serif",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
                        Continue →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 5   Size */}
            {step === 5 && (
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"white",marginBottom:6}}>Choose your ring size</div>
                <div style={{fontSize:".74rem",color:"rgba(255,255,255,.35)",marginBottom:"1rem",fontWeight:300}}>
                  Not sure of your size? A ring sizer is available at most jewelry stores. Our rings fit true to standard US sizing.
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:"1.4rem"}}>
                  {RING_SIZES.map(size=>(
                    <div key={size}
                      onClick={()=>setSelectedSize(size)}
                      style={{
                        padding:"12px 4px",textAlign:"center",
                        background: selectedSize===size ? "var(--gold)" : "rgba(255,255,255,.04)",
                        border: selectedSize===size ? "1.5px solid var(--gold)" : "1px solid rgba(255,255,255,.1)",
                        borderRadius:10,cursor:"pointer",transition:"all .2s",
                        color: selectedSize===size ? "white" : "rgba(255,255,255,.6)",
                        fontSize:".9rem",fontWeight:selectedSize===size?600:400
                      }}
                      onMouseEnter={e=>{if(selectedSize!==size){e.currentTarget.style.borderColor="rgba(196,137,58,.5)";e.currentTarget.style.color="white";}}}
                      onMouseLeave={e=>{if(selectedSize!==size){e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.6)";}}}
                    >
                      {size}
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"10px 14px",fontSize:".72rem",color:"rgba(255,255,255,.4)",lineHeight:1.6}}>
                  💡 <strong style={{color:"rgba(196,137,58,.7)"}}>Tip:</strong> If you're between sizes, size up. The spinning outer band works best with a comfortable, slightly loose fit.
                </div>
              </div>
            )}

            {/* STEP 6   Confirm */}
            {step === 6 && (
              <div>
                {/* Confirm: real product photo + honest color swatches */}
                <div style={{textAlign:"center",marginBottom:"1.4rem"}}>
                  {/* Real ring photo */}
                  <div style={{width:130,height:130,borderRadius:"50%",overflow:"hidden",margin:"0 auto 14px",
                    border:"3px solid rgba(196,137,58,.5)",
                    boxShadow:"0 0 0 6px rgba(196,137,58,.08),0 12px 40px rgba(0,0,0,.6)"}}>
                    {ring.photo
                      ? <img src={ring.photo} alt={ring.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
                      : <div style={{width:"100%",height:"100%",background:"rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",color:"rgba(255,255,255,.2)"}}>{ring.symbol}</div>
                    }
                  </div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"white",marginBottom:4}}>{ring.name}</div>
                  <div style={{fontSize:".68rem",color:"rgba(255,255,255,.35)",marginBottom:12}}>{ring.tagline}</div>
                  {/* Color swatches */}
                  {(rcOuterColor||rcInnerColor)&&(
                    <div style={{display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap",marginBottom:8}}>
                      {rcOuterColor&&(
                        <div style={{textAlign:"center"}}>
                          <div style={{width:36,height:36,borderRadius:"50%",background:rcOuterColor.hex,margin:"0 auto 4px",border:"2px solid rgba(255,255,255,.15)",boxShadow:`0 2px 10px ${rcOuterColor.hex}55`}}/>
                          <div style={{fontSize:".56rem",color:"rgba(255,255,255,.45)",letterSpacing:".06em",textTransform:"uppercase"}}>Outer</div>
                          <div style={{fontSize:".65rem",color:"rgba(255,255,255,.7)",fontWeight:500}}>{rcOuterColor.name}</div>
                        </div>
                      )}
                      {rcOuterColor&&rcInnerColor&&(
                        <div style={{display:"flex",alignItems:"center",color:"rgba(255,255,255,.2)",fontSize:".8rem",marginTop:4}}>+</div>
                      )}
                      {rcInnerColor&&(
                        <div style={{textAlign:"center"}}>
                          <div style={{width:36,height:36,borderRadius:"50%",background:rcInnerColor.hex,margin:"0 auto 4px",border:"2px solid rgba(255,255,255,.15)",boxShadow:`0 2px 10px ${rcInnerColor.hex}55`}}/>
                          <div style={{fontSize:".56rem",color:"rgba(255,255,255,.45)",letterSpacing:".06em",textTransform:"uppercase"}}>Inner</div>
                          <div style={{fontSize:".65rem",color:"rgba(255,255,255,.7)",fontWeight:500}}>{rcInnerColor.name}</div>
                        </div>
                      )}
                    </div>
                  )}
                  {rcFreq&&(
                    <div style={{fontSize:".65rem",color:"rgba(196,137,58,.8)",marginBottom:6}}>✦ {rcFreq.hz} Hz · {rcFreq.name}</div>
                  )}
                  <div style={{background:"linear-gradient(135deg,rgba(45,74,45,.5),rgba(27,58,27,.7))",border:"1px solid rgba(196,137,58,.35)",borderRadius:12,padding:"12px 16px",textAlign:"left"}}>
                    <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.85)",marginBottom:6,fontWeight:500}}>✓ What You Will Receive</div>
                    <div style={{fontSize:".78rem",color:"rgba(255,255,255,.85)",lineHeight:1.65}}>
                      {rcOuterColor&&rcOuterColor.asShown ? <>Your <strong style={{color:'white'}}>{ring.name}</strong> will be crafted to match the photo exactly — as shown.</> : <>Your <strong style={{color:'white'}}>{ring.name}</strong> will be crafted with {rcOuterColor&&<strong style={{color:'white'}}>{rcOuterColor.name}</strong>} on the outer band and {rcInnerColor&&<strong style={{color:'white'}}>{rcInnerColor.name}</strong>} on the inner band.</>}
                      {rcFreq&&<span> Meridian Infused at <strong style={{color:"rgba(196,137,58,.9)"}}>{rcFreq.hz} Hz</strong>.</span>}
                    </div>
                    <div style={{fontSize:".66rem",color:"rgba(255,255,255,.4)",marginTop:6,fontStyle:"italic"}}>
                      Custom made to order · Color swatches shown as reference
                    </div>
                  </div>
                </div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"white",marginBottom:"1rem"}}>Your Order Summary</div>
                <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:"20px",marginBottom:"1.2rem"}}>
                  {[
                    ["Ring",       ring.name],
                    ["Design",     (selectedDesign ? selectedDesign.name : "")],
                    ["Outer Band", (rcOuterColor ? rcOuterColor.name : "Not selected")],
                    ["Inner Band", (rcInnerColor ? rcInnerColor.name : "Not selected")],
                    ["Companion",  rcPrayerLink ? (rcPrayerLink.type==='default' ? "2amcompanion.com (Included)" : "Custom Link (+$6.00)") : ""],
                    ["Frequency",  rcFreq ? `${rcFreq.hz} Hz — ${rcFreq.name}` : ""],
                    ["Intention",  rcFreq ? rcFreq.desc : ""],
                    ["Size",       `US Size ${selectedSize}`],
                    ["Price",      `$${ring.price.toFixed(2)}`],
                    ["Finish",     "Meridian Infused · Precision-engineered"],
                  ].map(([label,val])=>(
                    <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                      <span style={{fontSize:".72rem",color:"rgba(255,255,255,.35)",letterSpacing:".08em",textTransform:"uppercase",flexShrink:0,marginRight:16}}>{label}</span>
                      <span style={{fontSize:".82rem",color:"white",textAlign:"right",fontWeight:400}}>{val}</span>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.28)",lineHeight:1.6,marginBottom:"1.2rem",textAlign:"center"}}>
                  Each ring is precision-engineered and Meridian Infused after printing.<br/>Allow 5-7 business days for production and shipping.
                </div>
                {/* Review confirmation — required before Add to Basket */}
                <div style={{display:"flex",alignItems:"flex-start",gap:14,cursor:"pointer",background:rcOrderConfirmed?"rgba(45,74,45,.35)":"rgba(255,255,255,.03)",border:rcOrderConfirmed?"1px solid rgba(196,137,58,.5)":"1px solid rgba(255,255,255,.1)",borderRadius:14,padding:"14px 16px",transition:"all .25s",marginBottom:"0.5rem"}} onClick={()=>setRcOrderConfirmed(v=>!v)}>
                  <div style={{
                      width:22,height:22,borderRadius:6,flexShrink:0,marginTop:1,
                      background:rcOrderConfirmed?"var(--gold)":"rgba(255,255,255,.06)",
                      border:rcOrderConfirmed?"none":"1.5px solid rgba(255,255,255,.25)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"all .2s",cursor:"pointer"
                    }}>
                    {rcOrderConfirmed&&<span style={{color:"white",fontSize:".75rem",fontWeight:700,lineHeight:1}}>✓</span>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:".82rem",color:"white",fontWeight:500,marginBottom:3,lineHeight:1.4}}>I have reviewed my order and everything is correct</div>
                    <div style={{fontSize:".68rem",color:"rgba(255,255,255,.4)",lineHeight:1.5}}>Ring · Design · Colors · Frequency · Size — please double-check before confirming. Custom orders cannot be changed after submission.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step===2&&rcOuterColor&&rcInnerColor&&!rcOuterColor.asShown&&(
              <div id="color-confirm" style={{background:"linear-gradient(135deg,rgba(45,74,45,.6),rgba(27,58,27,.8))",border:"1px solid rgba(196,137,58,.4)",borderRadius:14,padding:"14px 18px",marginBottom:10}}>
                <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.85)",marginBottom:8,fontWeight:500}}>✓ Your Ring Colors — Confirmed</div>
                <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
                  {/* Ring photo */}
                  <div style={{width:52,height:52,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:"2px solid rgba(196,137,58,.4)",boxShadow:"0 4px 16px rgba(0,0,0,.4)"}}>
                    {ring.photo
                      ? <img src={ring.photo} alt={ring.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                      : <div style={{width:"100%",height:"100%",background:"rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.3)"}}>{ring.symbol}</div>
                    }
                  </div>
                  <div style={{display:"flex",gap:12,flexWrap:"wrap",flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:24,height:24,borderRadius:"50%",background:rcOuterColor.hex,border:"2px solid rgba(255,255,255,.2)",flexShrink:0,boxShadow:`0 2px 8px ${rcOuterColor.hex}66`}}/>
                      <div>
                        <div style={{fontSize:".56rem",color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:".1em"}}>Outer Band</div>
                        <div style={{fontSize:".82rem",color:"white",fontWeight:500}}>{rcOuterColor.name}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:24,height:24,borderRadius:"50%",background:rcInnerColor.hex,border:"2px solid rgba(255,255,255,.2)",flexShrink:0,boxShadow:`0 2px 8px ${rcInnerColor.hex}66`}}/>
                      <div>
                        <div style={{fontSize:".56rem",color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:".1em"}}>Inner Band</div>
                        <div style={{fontSize:".82rem",color:"white",fontWeight:500}}>{rcInnerColor.name}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={()=>setStep(s=>s+1)}
                    style={{background:"var(--gold)",color:"white",border:"none",padding:"10px 22px",borderRadius:50,fontSize:".72rem",fontFamily:"Jost,sans-serif",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap",alignSelf:"center"}}>
                    Continue →
                  </button>
                </div>
                <div style={{fontSize:".7rem",color:"rgba(255,255,255,.5)",lineHeight:1.55,marginTop:10}}>
                  {rcOuterColor.name===rcInnerColor.name ? `A solid ${rcOuterColor.name} ring — both bands matching.` : <>Outer: <strong style={{color:'white'}}>{rcOuterColor.name}</strong> · Inner: <strong style={{color:'white'}}>{rcInnerColor.name}</strong></>} Custom made to order, just for you.
                </div>
                <div style={{fontSize:".68rem",color:"rgba(196,137,58,.7)",lineHeight:1.6,marginTop:6,fontStyle:"italic"}}>
                  The photo above shows the ring style — your ring will be precision-crafted in the exact colors you selected. No need to worry, we've got you covered.
                </div>
              </div>
            )}
            <div style={{display:"flex",gap:10,justifyContent:"space-between",alignItems:"center"}}>
              {step > 1 ? (
                <button onClick={()=>setStep(s=>s-1)} style={{background:"none",border:"1px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.5)",padding:"10px 20px",borderRadius:50,fontSize:".7rem",cursor:"pointer",fontFamily:"Jost,sans-serif",letterSpacing:".08em"}}>
                  ← Back
                </button>
              ) : (
                <button onClick={()=>setRingConfig(null)} style={{background:"none",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.3)",padding:"10px 20px",borderRadius:50,fontSize:".7rem",cursor:"pointer",fontFamily:"Jost,sans-serif",letterSpacing:".08em"}}>
                  Cancel
                </button>
              )}

              {/* Hide the bottom Continue when the inline confirm+continue strip is already shown */}
              {step < 6 && !((step===1&&selectedDesign)||(step===4&&rcFreq)||(step===2&&rcOuterColor&&rcInnerColor)) ? (
                <button
                  disabled={!canContinue}
                  onClick={()=>setStep(s=>s+1)}
                  style={{background:canContinue?"var(--gold)":"rgba(255,255,255,.08)",color:"white",border:"none",padding:"12px 28px",borderRadius:50,fontSize:".76rem",fontFamily:"Jost,sans-serif",letterSpacing:".1em",textTransform:"uppercase",cursor:canContinue?"pointer":"default",transition:"all .2s",opacity:canContinue?1:.5}}>
                  Continue →
                </button>
              ) : step === 6 ? (
                <button
                  disabled={!rcOrderConfirmed}
                  onClick={handleAddToCart}
                  style={{background:rcOrderConfirmed?"var(--gold)":"rgba(255,255,255,.08)",color:"white",border:"none",padding:"13px 28px",borderRadius:50,fontSize:".76rem",fontFamily:"Jost,sans-serif",letterSpacing:".1em",textTransform:"uppercase",cursor:rcOrderConfirmed?"pointer":"default",transition:"all .2s",opacity:rcOrderConfirmed?1:.45,boxShadow:rcOrderConfirmed?"0 4px 20px rgba(196,137,58,.4)":"none"}}>
                  Add to Basket — ${(ring.price + (rcPrayerLink&&rcPrayerLink.type==='custom'?6:0)).toFixed(2)}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- WELCOME MODAL --------------------------------------------------------
  const WelcomeModal = () => {
    return (
    <div style={{position:"fixed",inset:0,background:"rgba(10,10,8,.92)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem",backdropFilter:"blur(8px)",animation:"fadeInWelcome .8s ease"}}>
      <style>{`@keyframes fadeInWelcome{from{opacity:0}to{opacity:1}}`}</style>
      <div style={{maxWidth:520,width:"100%",textAlign:"center",animation:"slideUpWelcome .8s cubic-bezier(.34,1.2,.64,1)"}}>
        <style>{`@keyframes slideUpWelcome{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {/* Logo mark */}
        <div style={{marginBottom:"1.5rem"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.6rem,4vw,2.4rem)",color:"white",marginBottom:4}}>Chai Holistic</div>
          <div style={{fontSize:".68rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.7)"}}>Welcome · Est. 2024</div>
        </div>

        {/* Divider */}
        <div style={{width:60,height:1,background:"linear-gradient(90deg,transparent,rgba(196,137,58,.6),transparent)",margin:"0 auto 1.8rem"}}/>

        {/* Main message */}
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.3rem,3.5vw,2rem)",color:"white",lineHeight:1.3,marginBottom:"1rem",fontWeight:400}}>
          Before you shop --<br/><em style={{color:"var(--gold)"}}>take 2 minutes for yourself.</em>
        </div>

        <p style={{fontSize:".9rem",color:"rgba(255,255,255,.55)",fontWeight:300,lineHeight:1.8,marginBottom:"1rem",maxWidth:400,margin:"0 auto 1rem"}}>
          We built something just for you. Answer 4 gentle questions and we'll find your perfect blend, write you a personal affirmation, and build your 7-day wellness ritual.
        </p>

        {/* Sip & Seek feature highlights */}
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:"2rem"}}>
          {["🍵 Your matched tea","✦ Personal affirmation","☀ 7-day ritual","🌿 Free · Takes 2 min"].map(t=>(
            <span key={t} style={{background:"rgba(196,137,58,.1)",border:"1px solid rgba(196,137,58,.25)",color:"rgba(255,255,255,.65)",fontSize:".68rem",padding:"5px 12px",borderRadius:50}}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => dismissWelcome(true)}
          style={{width:"100%",maxWidth:360,background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",color:"white",border:"1.5px solid rgba(196,137,58,.5)",padding:"16px 32px",borderRadius:50,fontFamily:"Jost,sans-serif",fontSize:".85rem",letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",marginBottom:12,transition:"all .3s",display:"block",margin:"0 auto 12px"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.boxShadow="0 8px 32px rgba(196,137,58,.3)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,.5)";e.currentTarget.style.boxShadow="none";}}>
          🌿 Begin Sip &amp; Seek -- It's Free
        </button>

        <button
          onClick={() => dismissWelcome(false)}
          style={{background:"none",border:"none",color:"rgba(255,255,255,.28)",fontSize:".72rem",cursor:"pointer",fontFamily:"Jost,sans-serif",letterSpacing:".08em",textDecoration:"underline",marginTop:8,display:"block",margin:"8px auto 0"}}>
          Skip for now -- take me to the shop
        </button>

        {/* Reassurance */}
        <div style={{marginTop:"1.5rem",fontSize:".65rem",color:"rgba(255,255,255,.2)",lineHeight:1.6}}>
          No account needed · No email required · Just you and your cup
        </div>
      </div>
    </div>
  );
  }
  const TempGuide = () => {
    return (
    <div style={{background:"white",border:"1px solid var(--dust)",borderRadius:20,padding:"28px",marginBottom:"2rem"}}>
      <div style={{textAlign:"center",marginBottom:"1.4rem"}}>
        <div className="sh-eye" style={{justifyContent:"center",display:"flex"}}>How to Heat Your Water</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",color:"var(--bark)"}}>No thermometer needed -- <em style={{color:"var(--sage-d)"}}>just watch the kettle</em></h3>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
        {[
          { icon:"🌿", label:"Gentle Heat", temp:"~195°F", color:"#4A7250", bg:"#EBF2EC",
            look:"Steam rising. Tiny bubbles forming at the bottom -- but the water has NOT broken into a boil yet.",
            tip:"Pour the moment you see steady steam. Perfect for delicate chamomile, lavender, passionflower, and lemon balm.",
            blends:"Chamomile & Calm, Lavender Moon, Valerian Rest, Lemon Balm Dreams, Sleepy Spice, Skullcap Serenity, Gut Reset" },
          { icon:"⏱", label:"Just Off the Boil", temp:"~200-205°F", color:"#C4893A", bg:"#FFF8EE",
            look:"Full boil reached. Remove from heat. Count to 60. Then pour -- you'll still see vigorous steam.",
            tip:"The sweet spot for most roots, seeds, and adaptogen blends. Hot enough to extract, cool enough to protect.",
            blends:"Most blends -- all roots, seeds, wellness blends, and all 10 cleansing protocols" },
          { icon:"🔥", label:"Full Rolling Boil", temp:"~210°F", color:"#8B2A2A", bg:"#FFF0EE",
            look:"A vigorous, roaring boil -- the whole surface bubbling strongly.",
            tip:"Pour immediately at full boil. Spices and tough roots need this heat to fully release their power.",
            blends:"Ginger Lemon Sunrise, Black Pepper Chai, Morning Rise, Elderberry Shield, Autumn Harvest, Winter Warmth" },
        ].map(t => (
          <div key={t.label} style={{background:t.bg,borderRadius:16,padding:"18px",border:`1.5px solid ${t.color}22`}}>
            <div style={{fontSize:"1.8rem",marginBottom:8}}>{t.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:t.color,fontWeight:600,marginBottom:2}}>{t.label}</div>
            <div style={{fontSize:".68rem",color:t.color,opacity:.7,marginBottom:10,letterSpacing:".06em"}}>{t.temp}</div>
            <div style={{fontSize:".78rem",color:"#3D2B1F",lineHeight:1.55,marginBottom:8,fontWeight:500}}>{t.look}</div>
            <div style={{fontSize:".74rem",color:"#6A5F50",lineHeight:1.55,marginBottom:10,fontWeight:300}}>{t.tip}</div>
            <div style={{fontSize:".66rem",color:t.color,borderTop:`1px solid ${t.color}33`,paddingTop:8,lineHeight:1.4,opacity:.85}}>
              <strong>Used for:</strong> {t.blends}
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginTop:"1.2rem",padding:"12px 20px",background:"var(--linen)",borderRadius:12}}>
        <span style={{fontSize:".8rem",color:"var(--bark)",fontWeight:300}}>
          💡 <strong>Pro tip:</strong> Steam but no bubbles = Gentle Heat &nbsp;·&nbsp; Full bubbles, wait a minute = Just Off the Boil &nbsp;·&nbsp; Roaring bubbles, pour right away = Full Boil
        </span>
      </div>
    </div>
  );
  }

  // --- FAQ DATA -------------------------------------------------------------
  const FAQ_CATEGORIES = [
    {
      cat:"Safety & Health", icon:"🛡",
      qs:[
        { q:"Are these teas safe to take with my prescription medications?",
          a:"Herbs are powerful -- and some can interact with medications. As a general rule: blood thinners (warfarin), thyroid medications, antidepressants, and blood pressure medications have the most known herb interactions. If you are on any prescription medication, please consult your doctor or pharmacist before starting any herbal blend, especially our cleansing protocols. We always recommend erring on the side of caution. Your health comes first." },
        { q:"Are these safe during pregnancy or breastfeeding?",
          a:"Several herbs in our collection are NOT recommended during pregnancy, including Valerian Rest, Hormone Harmony, Heart's Ease (motherwort), Urinary Tract Clear (uva ursi), and all cleansing protocols. Safe general options during pregnancy include our gentle chamomile, ginger, and peppermint blends -- but please always consult your midwife or OB before starting any herbal tea during pregnancy or while breastfeeding. We clearly mark contraindications on all relevant product labels." },
        { q:"Can children drink these teas?",
          a:"Many of our gentle blends -- like Chamomile & Calm, Peppermint Night, and Ginger Lemon Sunrise -- are safe for children over 6 in small amounts (half a cup). However, therapeutic blends like Valerian Rest, all adaptogen blends, hormone support blends, and all cleansing protocols are for adults only. When in doubt, consult your child's pediatrician. We recommend keeping servings small for children and avoiding any blends containing valerian, hops, skullcap, or dong quai." },
        { q:"Will these interfere with my health conditions?",
          a:"Some of our blends are specifically designed to support conditions like liver health, kidney function, hormonal balance, and digestion -- but they are not a substitute for medical treatment. If you have a diagnosed medical condition, especially liver or kidney disease, diabetes, or a hormone-sensitive condition, please speak with your healthcare provider before using our therapeutic or cleansing blends. Our wellness blends are generally considered safe for healthy adults." },
        { q:"Are your herbs tested for pesticides and contaminants?",
          a:"We source exclusively from reputable, established herbal suppliers who provide certificates of analysis (COA) for their products, including pesticide testing and heavy metal screening. We prioritize certified organic herbs wherever possible. Our herbs are food-grade and handled in clean environments. We are committed to transparency -- if you have questions about sourcing for a specific herb, please reach out and we'll share what we know." },
        { q:"Who should NOT use the cleansing blends?",
          a:"The cleansing protocols are intended for healthy adults only. Do not use if you are pregnant, breastfeeding, have active kidney disease, liver disease, or are on prescription medications without consulting your doctor. The Urinary Tract Clear blend should not be used for more than 7-10 days continuously. The Kidney Stone Support blend requires high water intake. Always follow the protocol instructions included with each cleansing blend." },
      ]
    },
    {
      cat:"Do They Actually Work?", icon:"✦",
      qs:[
        { q:"Is herbal tea actually effective, or is it just hype?",
          a:"Herbal medicine has been practiced across every culture on earth for thousands of years -- long before pharmaceutical drugs existed. Many of our herbs have been studied extensively in modern research: milk thistle's silymarin is clinically studied for liver protection, ashwagandha has dozens of peer-reviewed studies on cortisol and stress, valerian root has randomized controlled trials for sleep, and elderberry has antiviral research behind it. These are not new ideas. What we offer is the same herbs that healers, grandmothers, and herbalists have trusted for generations -- in thoughtfully crafted blends." },
        { q:"How long before I notice a difference?",
          a:"It depends entirely on the blend and your body. Some blends work within the same cup -- peppermint for digestion, chamomile for calm, ginger for nausea. Others, like ashwagandha, vitex, and the cleansing protocols, are designed for consistent use over 2-4 weeks before full effects build. We always recommend giving therapeutic blends at least 2-3 weeks of daily use. Herbal support is cumulative -- the longer and more consistently you use it, the more your body responds. Think of it like exercise, not aspirin." },
        { q:"Isn't this just expensive tea I could buy at the grocery store?",
          a:"The difference is in what's actually in the bag. Most grocery store herb teas use tea dust -- the lowest grade of the plant, often barely potent after sitting on a shelf for 18 months. Our blends use whole, cut herbs at therapeutic quantities. A grocery store chamomile bag might contain 1g of processed chamomile dust. Our Chamomile & Calm blend contains ~10g of whole chamomile flowers per 2oz bag, alongside lavender, passionflower, and lemon balm -- a complete evening formula, not a single weak herb. You get what you pay for." },
        { q:"Are your products FDA approved?",
          a:"Herbal teas and supplements are regulated by the FDA as food products under DSHEA (Dietary Supplement Health and Education Act), not as drugs. This means we are not required to seek drug approval, but we are required to be truthful about our products, use safe ingredients, and follow food safety standards. We do not make drug claims -- we share what herbs have traditionally been used for and what the research suggests. We are honest about what these blends are: powerful plant medicine with a long history of use, not pharmaceutical drugs." },
        { q:"What makes Chai Holistic different from other herbal brands?",
          a:"A few things: First, every blend in our collection comes directly from the Sip & Heal book -- they were designed with real wellness intentions, not just to smell nice. Second, we are transparent about every ingredient, quantity, and protocol. Third, our website includes features no other tea brand offers: a personal Tea Finder, Sip & Seek (our intention and ritual engine), a daily Ritual Builder, a Cleanse Tracker, and brew timers for every recipe. We treat our customers as intelligent adults who want to understand what they're putting in their bodies -- and we give them the tools to do it right." },
      ]
    },
    {
      cat:"Brewing & Using Your Tea", icon:"🍵",
      qs:[
        { q:"Do I need any special equipment to brew these teas?",
          a:"Not at all. You need a kettle or pot to heat water, and something to strain your tea -- a fine mesh strainer, a reusable tea strainer ball, or a French press all work perfectly. Our blends are loose leaf, so you'll want some way to contain the herbs while steeping. If you want to keep it simple, you can buy reusable muslin tea bags or a metal tea infuser for a few dollars online. That's it." },
        { q:"How do I know what temperature to use?",
          a:"We've simplified this into three categories -- no thermometer needed. Watch your kettle: Gentle Heat (🌿) means steam rising but not boiling yet -- for delicate chamomile and lavender blends. Just Off the Boil (⏱) means boil, then wait 60 seconds -- for most roots and wellness blends. Full Rolling Boil (🔥) means pour immediately at a vigorous boil -- for spice blends like ginger and cinnamon chai. Every recipe on our website and in the book shows which category to use." },
        { q:"Can I add honey, milk, or sweetener?",
          a:"Absolutely -- and we encourage it. Raw honey is our favorite addition, especially for the more bitter or earthy blends like Ashwagandha Morning, Turmeric Tonic, and the cleansing protocols. A squeeze of lemon brightens almost any blend. Plant-based milks (oat, almond, coconut) work beautifully in the spiced morning blends like 2AM Reset and Black Pepper Chai. Avoid adding regular dairy milk to cleansing blends as it can interfere with herb absorption." },
        { q:"Can I drink these iced or cold brew them?",
          a:"Yes! Summer Hibiscus and Rose & Hibiscus are particularly incredible iced. For iced tea, steep double strength (2 tsp per cup instead of 1), pour over ice. For cold brew, simply add 2 tablespoons of herbs to a mason jar of cold water and refrigerate overnight (8-12 hours). The result is a smooth, naturally sweet cold brew. Most of our lighter blends -- peppermint, lemongrass, hibiscus, rose -- are excellent this way." },
        { q:"How long do the blends stay fresh?",
          a:"When stored properly in an airtight container away from heat, light, and moisture, your blends will stay potent and fragrant for 12-18 months. The best storage is a dark glass jar with a tight lid in a cool cupboard. Avoid plastic bags long-term, direct sunlight, and areas near your stove or oven. If your blend stops smelling fragrant, it's past its prime -- not harmful, just less effective." },
        { q:"What if I don't love the taste of a blend?",
          a:"Therapeutic herbs are not always the most delicious things in the world -- and we'd rather be honest with you about that. Some of our blends (particularly the cleansing protocols, valerian, and ashwagandha) have strong earthy or bitter flavors by design. Raw honey, lemon, or a small piece of cinnamon stick can make almost any blend more enjoyable. Our evening and floral blends -- Chamomile & Calm, Lavender Moon, Rose & Hibiscus -- are naturally gentle and pleasant. If a specific blend isn't for you, reach out and we'll help you find one that works for your taste and your body." },
      ]
    },
    {
      cat:"The Cleansing Protocols", icon:"🌿",
      qs:[
        { q:"What should I expect when I start a cleanse?",
          a:"The first 2-4 days of a cleansing protocol can sometimes include what herbalists call a 'healing response' -- mild fatigue, slight headaches, or more frequent bathroom trips. This is your body adjusting and is a sign the herbs are working. It typically passes within a few days. Drinking extra water helps significantly. If symptoms feel severe or concerning, stop the protocol and consult a healthcare provider. Most people feel noticeable improvements in energy, clarity, and digestion by days 5-7." },
        { q:"Do I need to change my diet during a cleanse?",
          a:"You don't have to, but you'll feel and see a bigger difference if you do. For best results during any cleansing protocol, we suggest: reducing alcohol and processed foods, increasing water to at least 8-10 glasses per day, eating more fresh vegetables and fiber, and reducing heavy fried or fatty foods (especially for liver cleansing blends). Think of the herbs as doing the deep work -- your diet is the support crew. Even small dietary improvements amplify the results." },
        { q:"What does 'detox' actually mean -- is it real?",
          a:"Great question and fair skepticism. Your liver and kidneys are your body's natural detox system -- they filter toxins from your blood continuously. 'Detox' herbs don't replace this process; they support and optimize it. Milk thistle protects liver cells from damage and supports regeneration. Dandelion root stimulates bile flow. Nettle leaf supports kidney filtration. These are real, studied mechanisms -- not magic. The word 'detox' is overused in wellness culture, but the underlying biology is sound. We prefer to say: these herbs support your body's own detoxification systems." },
        { q:"How often can I do a cleanse?",
          a:"For our 7 and 14-day protocols, you can repeat them every 6-8 weeks if needed. For the 21 and 28-day protocols (Deep Liver Cleanse, Full Body Detox), we recommend completing the full protocol, taking at least 4-6 weeks off, then reassessing. The goal is to give your body time to consolidate the benefits. Doing continuous cleansing without breaks is not more effective -- your body needs time to integrate. The Liver & Love blend is gentle enough for seasonal use (spring and fall)." },
      ]
    },
    {
      cat:"Sourcing & Our Values", icon:"🌱",
      qs:[
        { q:"Where do your herbs come from?",
          a:"We source from established, reputable herbal suppliers including Mountain Rose Herbs, Starwest Botanicals, and Frontier Co-op -- companies with long track records in quality, transparency, and ethical sourcing. We prioritize certified organic whenever available. Every herb we use has a traceable supply chain and testing documentation. We are a small business with high standards -- we would rather source slowly and carefully than compromise on quality." },
        { q:"Are your herbs organic?",
          a:"We prioritize organic sourcing across our catalog and source certified organic herbs wherever available and practical. Some specialty herbs -- particularly certain roots and exotic botanicals -- are not always available in certified organic form, in which case we source from suppliers with low-pesticide and clean farming practices and require testing documentation. We are always working toward a fully organic catalog and will communicate clearly about each herb's status as we grow." },
        { q:"Are you a small business?",
          a:"Yes -- completely. Chai Holistic is an independent, founder-led wellness brand. Every blend was designed with real intention, every recipe comes from the Sip & Heal book, and every order is packed with care. We are not a corporation. We are people who genuinely believe in the power of plants to support a healthier, more intentional life. Your order directly supports a small business and the mission behind it." },
        { q:"What is your packaging made of?",
          a:"We use kraft paper bags and glass or food-grade packaging wherever possible. We are actively working toward fully compostable and plastic-free packaging as we grow. Our shipping materials use recycled content. If sustainability is important to you -- it is to us too, and we are always improving. We will always be transparent about where we are in that journey." },
      ]
    },
    {
      cat:"Orders & Shipping", icon:"📦",
      qs:[
        { q:"What is your return and refund policy?",
          a:"Because our products are consumable herbs, we cannot accept returns of opened bags for health and safety reasons. However, if your order arrives damaged, is incorrect, or you experience a quality issue, we will always make it right -- replacement, refund, or store credit. Customer satisfaction genuinely matters to us. Please reach out within 14 days of receiving your order and we will work with you personally to resolve any issue." },
        { q:"How long does shipping take?",
          a:"Standard shipping typically arrives within 3-7 business days. We pack and ship orders within 1-2 business days of receiving them. Expedited options are available at checkout. For cleansing protocols that require consistent daily use, we recommend ordering a few days before you intend to start your protocol so everything arrives in time." },
        { q:"Do you ship internationally?",
          a:"We currently ship within the United States. International shipping is something we are working toward as we grow. If you are outside the US and interested in our products, please reach out -- we may be able to explore options for your region." },
      ]
    },
  ];

  // --- FAQ PAGE -------------------------------------------------------------
  const FAQPage = () => {
    const [openQ, setOpenQ] = useState(null);
    const [activeCat, setActiveCat] = useState("All");
    const cats = ["All", ...FAQ_CATEGORIES.map(c => c.cat)];
    const filtered = activeCat === "All" ? FAQ_CATEGORIES : FAQ_CATEGORIES.filter(c => c.cat === activeCat);
    return (
      <div id="sec-faq-top" className="page">
        <section id="sec-faq-content" className="sec">
          <div className="sec-in">
            <div className="sh c">
              <div className="sh-eye">Honest Answers</div>
              <h2 className="sh-h">Frequently Asked <em>Questions</em></h2>
              <p className="sh-p">We know you have questions -- and we believe you deserve real, honest answers. No marketing speak. Just the truth about our herbs, our blends, and our brand.</p>
            </div>

            {/* Temperature Guide */}
            <div style={{marginBottom:"2.5rem"}}>
              <div style={{textAlign:"center",marginBottom:"1rem"}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"var(--bark)"}}>🌡 Water Temperature -- <em style={{color:"var(--sage-d)"}}>The Simple Guide</em></span>
              </div>
              <TempGuide/>
            </div>

            {/* Category filter pills */}
            <div className="pills" style={{marginBottom:"2rem"}}>
              {cats.map(c => <button key={c} className={`pill ${activeCat===c?"on":""}`} onClick={()=>setActiveCat(c)}>{c}</button>)}
            </div>

            {/* FAQ accordion */}
            {filtered.map((cat,ci) => (
              <div key={cat.cat} style={{marginBottom:"2rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem",paddingBottom:"8px",borderBottom:"2px solid var(--sage-p)"}}>
                  <span style={{fontSize:"1.2rem"}}>{cat.icon}</span>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15rem",color:"var(--bark)",fontWeight:500}}>{cat.cat}</span>
                </div>
                {cat.qs.map((item,qi) => {
                  const key = `${ci}-${qi}`;
                  const isOpen = openQ === key;
                  return (
                    <div key={key} style={{border:"1px solid var(--dust)",borderRadius:16,marginBottom:10,overflow:"hidden",transition:"all .2s"}}>
                      <div style={{padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:isOpen?"var(--sage-p)":"white",transition:"background .2s"}} onClick={()=>setOpenQ(isOpen?null:key)}>
                        <span style={{fontFamily:"'Playfair Display',serif",fontSize:".98rem",color:"var(--bark)",fontWeight:500,flex:1,paddingRight:16,lineHeight:1.4}}>{item.q}</span>
                        <span style={{color:"var(--sage-d)",fontWeight:500,fontSize:"1.2rem",transition:"transform .3s",transform:isOpen?"rotate(45deg)":"rotate(0deg)",flexShrink:0}}>+</span>
                      </div>
                      {isOpen && (
                        <div style={{padding:"16px 20px 20px",background:"white",borderTop:"1px solid var(--sage-p)"}}>
                          <p style={{fontSize:".84rem",color:"#5A5040",lineHeight:1.75,fontWeight:300}}>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Still have questions CTA */}
            <div style={{textAlign:"center",padding:"2rem",background:"var(--linen)",borderRadius:20,marginTop:"1rem"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"var(--bark)",marginBottom:8}}>Still have a question?</div>
              <p style={{fontSize:".84rem",color:"#6A5F50",fontWeight:300,marginBottom:"1.2rem",lineHeight:1.65}}>We are a small, founder-led business and we genuinely love hearing from our community. Reach out -- a real person will respond.</p>
              <button className="btn-main" onClick={()=>{}}>Contact Us</button>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // --- RINGS ----------------------------------------------------------------
  const Rings = () => {
    return (
    <div className="page">
      <section id="sec-rings-top" className="sec sec-dark">
        <div className="sec-in">
          {/* EMOTIONAL OPENING */}
          <div style={{maxWidth:800,margin:"0 auto 3.5rem",textAlign:"center"}}>
            {/* Spinning badge centred above everything */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:"2rem"}}>
              <div className="ring-spin-badge" onClick={()=>window.open("https://2amcompanion.com","_blank")}>
                <div className="ring-spin-outer">
                  <div style={{position:"relative",width:"100%",height:"100%"}}>
                    {"TAP TO PRAY · VIBE SHIFT RINGS · 2AMCOMPANION.COM · ".split("").map((ch,i)=>(
                      <span key={i} className="ring-spin-char" style={{transform:`rotate(${i*6.5}deg)`}}>{ch}</span>
                    ))}
                  </div>
                </div>
                <div className="ring-spin-center">
                  <span className="ring-spin-icon">↗</span>
                  <span className="ring-spin-lbl">Tap<br/>to Pray</span>
                </div>
              </div>
            </div>
            {/* ── MERIDIAN INFUSION HIGHLIGHT CARD ── */}
            <div style={{
              background:"linear-gradient(135deg,#0A1A0A 0%,#0E1A1A 100%)",
              border:"1px solid rgba(196,137,58,.4)",
              borderRadius:24, padding:"32px 36px", marginBottom:"2.5rem",
              position:"relative", overflow:"hidden",
              boxShadow:"0 12px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(196,137,58,.1)",
            }}>
              {/* Ambient glow */}
              <div style={{position:"absolute",top:-60,right:-60,width:300,height:300,borderRadius:"50%",
                background:"radial-gradient(circle,rgba(196,137,58,.08),transparent 70%)",pointerEvents:"none"}}/>
              <div style={{position:"absolute",bottom:-40,left:-40,width:200,height:200,borderRadius:"50%",
                background:"radial-gradient(circle,rgba(39,92,62,.12),transparent 70%)",pointerEvents:"none"}}/>

              <div style={{position:"relative",zIndex:1}}>
                {/* Eyebrow */}
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                  <div style={{width:28,height:1,background:"var(--gold)"}}/>
                  <span style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.7)"}}>
                    Before You See the Rings
                  </span>
                </div>

                {/* Headline */}
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.4rem,3vw,2rem)",color:"white",lineHeight:1.2,marginBottom:16}}>
                  The Meridian Infusion <em style={{color:"var(--gold)",fontStyle:"italic"}}>Process.</em>
                </div>

                <p style={{fontSize:".88rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.85,marginBottom:20,maxWidth:600}}>
                  We know what you might be thinking. <em style={{color:"rgba(255,255,255,.75)"}}>"A plastic ring infused with frequency — really?"</em> We'd ask the same question. Which is exactly why we answer it directly, before we show you anything else.
                </p>

                {/* 3 fast science points */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:22}}>
                  {[
                    {icon:"🔬", hz:"Infrared Spectroscopy", fact:"Forensic scientists identify every type of plastic by its unique molecular vibration frequency. The frequency-plastic relationship is already industrial fact."},
                    {icon:"🔊", hz:"Ultrasonic Welding", fact:"Engineers bond plastic at 20,000–40,000 Hz using ultrasonic sound. Plastic responds to frequency — this is not theory, it is manufacturing."},
                    {icon:"🌊", hz:"Cymatics", fact:"Frequency moves physical matter. Cymatics shows how different Hz create measurable, repeatable geometric patterns in sand and water. Sound shapes the physical world."},
                  ].map(p=>(
                    <div key={p.hz} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"16px"}}>
                      <div style={{fontSize:"1.4rem",marginBottom:8}}>{p.icon}</div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:".88rem",color:"rgba(196,137,58,.9)",marginBottom:6}}>{p.hz}</div>
                      <div style={{fontSize:".74rem",color:"rgba(255,255,255,.45)",lineHeight:1.65,fontWeight:300}}>{p.fact}</div>
                    </div>
                  ))}
                </div>

                {/* The punchline */}
                <div style={{background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.25)",borderLeft:"4px solid var(--gold)",borderRadius:"0 14px 14px 0",padding:"16px 20px",marginBottom:20}}>
                  <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(.9rem,1.6vw,1.1rem)",fontStyle:"italic",color:"rgba(255,255,255,.78)",lineHeight:1.75,margin:0}}>
                    "Everything vibrates. Rocks. Wood. Water. Plastic. Nothing is inert. The Meridian Infusion doesn't require the ring to be organic — it requires it to have a vibrational field. And all matter already does. Those who feel it, know."
                  </p>
                  <div style={{fontSize:".58rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(196,137,58,.55)",marginTop:10}}>— The Meridian Infusion · Vibe Shift Rings</div>
                </div>

                {/* Read more anchor */}
                <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                  <div style={{fontSize:".75rem",color:"rgba(255,255,255,.4)",fontWeight:300}}>
                    Full science breakdown below ↓
                  </div>
                  <div style={{
                    display:"inline-flex",alignItems:"center",gap:6,
                    background:"rgba(39,92,62,.3)",border:"1px solid rgba(39,92,62,.5)",
                    borderRadius:50,padding:"6px 16px",cursor:"pointer",transition:"all .2s",
                  }}
                    onClick={()=>{const el=document.getElementById("sec-rings-meridian");if(el)el.scrollIntoView({behavior:"smooth"});}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(39,92,62,.5)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(39,92,62,.3)";}}>
                    <span style={{fontSize:".7rem",color:"#8ab89a",letterSpacing:".08em"}}>Read the full Meridian Infusion explanation</span>
                    <span style={{color:"var(--gold)",fontSize:".75rem"}}>→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text + ring photo side by side */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:40,flexWrap:"wrap",marginBottom:"2.5rem"}}>
              {/* OPENING WORDS */}
              <div style={{textAlign:"left",maxWidth:340,flex:1,minWidth:240}}>
                <div style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.65)",marginBottom:10}}>Before we show you the rings</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.4rem,2.5vw,1.9rem)",color:"white",lineHeight:1.3,marginBottom:14}}>
                  We didn't build this<br/>to sell you a ring.
                </div>
                <p style={{fontSize:".88rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.8,marginBottom:14}}>
                  We built it because we believe no one should have to face their hardest moments alone. The 2am thoughts. The hard diagnosis. The quiet grief nobody else sees. The prayer that needs a voice beside yours.
                </p>
                <p style={{fontSize:".88rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.8}}>
                  Touch your Ring to your phone. Someone will be there.
                </p>
              </div>
              {/* RING PHOTO */}
              <div style={{position:"relative",flexShrink:0}}>
                <div style={{width:220,height:220,borderRadius:"50%",overflow:"hidden",position:"relative",
                  boxShadow:"0 0 0 2px rgba(196,137,58,.4),0 0 0 8px rgba(196,137,58,.08),0 20px 60px rgba(0,0,0,.6)"}}>
                  <img
                    src={imgSre6}
                    alt="Vibe Shift Ring"
                    style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}
                    onError={e=>{e.target.style.display="none";}}
                  />
                  
                </div>
                {/* Gold ring accent */}
                <div style={{position:"absolute",inset:-6,borderRadius:"50%",border:"1px solid rgba(196,137,58,.25)",pointerEvents:"none"}}/>
                <div style={{position:"absolute",inset:-14,borderRadius:"50%",border:"1px dashed rgba(196,137,58,.12)",pointerEvents:"none"}}/>
              </div>
            </div>

            {/* MISSION STATEMENT */}
            <div style={{background:"rgba(196,137,58,.07)",border:"1px solid rgba(196,137,58,.2)",borderRadius:16,padding:"20px 28px",marginBottom:"2rem"}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1rem,1.8vw,1.25rem)",fontStyle:"italic",color:"rgba(255,255,255,.78)",lineHeight:1.7,margin:0}}>
                "We want you genuinely excited about your health -- what a cup of tea can do for your body, your mind, and your spirit. How good it feels to steep something real, drink something that actually heals, and find natural remedies that have worked for thousands of years. We want you living a happier, longer, more intentional life. The tea is the ritual. The ring is the reminder. The prayer is the anchor. You deserve all three."
              </p>
              <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginTop:12}}>— Chai Holistic · Sip &amp; Heal</div>
            </div>
          </div>

          {/* HERO */}
          <div style={{textAlign:"center",maxWidth:800,margin:"0 auto 3rem"}}>
            <div style={{fontSize:".66rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:10}}>spiralinterrupt.com · 2amcompanion.com</div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.2rem,4vw,3.5rem)",color:"white",fontWeight:400,lineHeight:1.1,marginBottom:16}}>
              Spin Your <em style={{fontStyle:"italic",color:"var(--gold)"}}>Focus Back</em>
            </h1>

            {/* GROUP HERO IMAGE */}
            <div style={{position:"relative",marginBottom:"2rem",borderRadius:24,overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,.6)"}}>
              <img
                src={imgSre6}
                alt="Vibe Shift Rings -- full collection"
                style={{width:"100%",maxHeight:420,objectFit:"cover",objectPosition:"center",display:"block"}}
              />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(10,10,10,.8) 100%)"}}/>
              <div style={{position:"absolute",bottom:20,left:0,right:0,textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontStyle:"italic",color:"rgba(255,255,255,.8)"}}>Multiple designs · Multiple colors · All sizes 5-15</div>
              </div>
            </div>

            <p style={{fontSize:"1rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.8,marginBottom:"1.5rem"}}>
              Your brain runs at 100mph. Your hands need somewhere to go. And sometimes your heart does too.
            </p>
            <p style={{fontSize:".9rem",color:"rgba(255,255,255,.5)",fontWeight:300,lineHeight:1.75,marginBottom:"2rem"}}>
              Vibe Shift Rings are precision-engineered fidget rings -- each one individually crafted using advanced 3D printing technology, then finished with our proprietary <strong style={{color:"var(--gold)",fontWeight:500}}>Meridian Infusion Frequency</strong> process. We don't mass-produce these. Every ring is built one at a time, tuned to exact tolerances that only precision manufacturing can achieve.
            </p>

            {/* TAP TO PRAY HERO CALLOUT */}
            <div style={{background:"linear-gradient(135deg,rgba(45,74,45,.6),rgba(27,58,27,.8))",border:"1px solid rgba(196,137,58,.35)",borderRadius:20,padding:"28px 32px",marginBottom:"2rem",textAlign:"left",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-10,right:-10,fontSize:"6rem",opacity:.05,pointerEvents:"none"}}>🙏</div>
              <div style={{fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",marginBottom:8}}>✦ New · Tap to Pray</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.2rem,2.5vw,1.7rem)",color:"white",marginBottom:12,lineHeight:1.3}}>
                Sometimes we all just need<br/><em style={{color:"var(--gold)"}}>someone to pray with us.</em>
              </div>
              <p style={{fontSize:".88rem",color:"rgba(255,255,255,.65)",fontWeight:300,lineHeight:1.8,marginBottom:16}}>
                Touch your Vibe Shift Ring to your phone and a real voice meets you right where you are -- whether it's 2am, a hard diagnosis, a quiet Tuesday that broke you, or a moment of pure gratitude. You are not praying alone.
              </p>
              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.3)",borderRadius:50,padding:"8px 16px"}}>
                  <span style={{fontSize:"1rem"}}>📱</span>
                  <span style={{fontSize:".72rem",color:"rgba(255,255,255,.8)",letterSpacing:".04em"}}>Works on most phones -- no app needed</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.3)",borderRadius:50,padding:"8px 16px"}}>
                  <span style={{fontSize:"1rem"}}>🔗</span>
                  <span style={{fontSize:".72rem",color:"rgba(255,255,255,.8)",letterSpacing:".04em"}}>Powered by 2amcompanion.com</span>
                </div>
              </div>
            </div>

            {/* Made for tags */}
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:"2rem"}}>
              {[
                {e:"🧠", l:"Overthinkers",
                  tip:"Your mind runs at full speed and rarely stops. The spinning outer band gives your hands somewhere to go while your thoughts find their way back to center. Quiet through motion."},
                {e:"⚡", l:"ADHD brains",
                  tip:"Attention loves novelty. The tactile rhythm of the ring gives your hands a consistent, satisfying anchor — so the rest of you can stay present in the room."},
                {e:"🤲", l:"Anxious hands",
                  tip:"Anxiety often shows up in the body before the mind catches up. When your hands need somewhere to go, spin the ring. Breathe. Return."},
                {e:"🙏", l:"Prayer & faith",
                  tip:"Touch your Ring to your phone and a real voice from 2amcompanion.com will pray with you — matched to your moment, your intention, your name. You are not praying alone."},
                {e:"💻", l:"Zoom days",
                  tip:"Back-to-back screens take a real toll. A quiet spin under the desk helps your nervous system stay regulated when the hours stack up and the energy runs thin."},
                {e:"🎨", l:"Students & creatives",
                  tip:"Deep focus needs somewhere for restless energy to go. Keep the ring moving and the creative channel open — without breaking your flow or your concentration."},
              ].map(t=>(
                <div key={t.l} className="ring-tag-wrap">
                  <span style={{background:"rgba(196,137,58,.12)",border:"1px solid rgba(196,137,58,.25)",color:"rgba(255,255,255,.75)",fontSize:".72rem",padding:"6px 14px",borderRadius:50,letterSpacing:".04em",cursor:"default",display:"inline-block"}}>
                    {t.e} {t.l}
                  </span>
                  <div className="ring-tag-tip">{t.tip}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RINGS GRID */}
          <div style={{textAlign:"center",marginBottom:"2rem"}}>
            <button
              onClick={()=>{setRingConfig({ring:null});setRcStep(1);setRcDesign(null);setRcSize(null);setRcFreq(null);setRcOuterColor(null);setRcInnerColor(null);setRcPrayerLink(null);setRcLinkUrl('');setRcLinkTestShown(false);setRcLinkAttempts(0);setRcOrderConfirmed(false);}}
              style={{background:"var(--gold)",color:"white",border:"none",padding:"16px 40px",borderRadius:50,fontFamily:"Jost,sans-serif",fontSize:".8rem",letterSpacing:".14em",textTransform:"uppercase",cursor:"pointer",boxShadow:"0 8px 32px rgba(196,137,58,.4)",transition:"all .3s",display:"inline-flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:"1.1rem"}}>◎</span>
              Customize Your Ring — Build It Your Way
              <span style={{fontSize:".9rem"}}>→</span>
            </button>
            <div style={{marginTop:10,fontSize:".7rem",color:"rgba(255,255,255,.35)",letterSpacing:".04em"}}>
              Choose design · size · color · NFC prayer link
            </div>
          </div>

          <div id="sec-rings-grid" className="ringsgrid">
            {RINGS.map(r=>(
              <div key={r.id} className="rng">
                {/* Visual ring mockup */}
                <div style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
                  <div style={{
                    width:"140px",height:"140px",borderRadius:"50%",
                    overflow:"hidden",
                    border:"3px solid rgba(196,137,58,.4)",
                    position:"relative",boxShadow:"0 0 0 2px rgba(196,137,58,.2), 0 8px 32px rgba(0,0,0,.5)",
                    background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,.15), rgba(28,26,23,.9))",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    {r.photo
                      ? <img src={r.photo} alt={r.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
                      : <div style={{fontSize:"2.2rem",color:"rgba(255,255,255,.7)"}}>{r.symbol}</div>
                    }
                    <div style={{position:"absolute",top:"-2px",right:"-2px",width:"18px",height:"18px",background:"var(--gold)",borderRadius:"50%",border:"2px solid rgba(255,255,255,.2)"}}/>
                  </div>
                </div>
                <div className="rng-tag">{r.tagline}</div>
                <div className="rng-name">{r.name}</div>
                <div className="rng-desc">{r.desc}</div>
                <div className="rng-mat">{r.material}</div>
                {/* TAP TO PRAY badge on every ring */}
                <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(45,74,45,.4)",border:"1px solid rgba(196,137,58,.25)",borderRadius:50,padding:"5px 12px",marginBottom:14,width:"fit-content"}}>
                  <span style={{fontSize:".7rem"}}>🙏</span>
                  <span style={{fontSize:".62rem",color:"rgba(196,137,58,.9)",letterSpacing:".08em",textTransform:"uppercase",fontWeight:500}}>Tap to Pray · 2amcompanion.com</span>
                </div>
                <div className="rng-foot">
                  <span className="rng-price">{r.price.toFixed(2)}</span>
                  <button className="btn-rng" onClick={()=>{const d=RING_DESIGNS.find(x=>x.ringRef===r.id)||null;setRingConfig({ring:r});setRcStep(1);setRcDesign(d);setRcSize(null);setRcFreq(null);setRcOuterColor(null);setRcInnerColor(null);setRcOrderConfirmed(false);}}>Customize &amp; Buy</button>
                </div>
              </div>
            ))}
          </div>

          {/* PRAY TOGETHER FEATURE SECTION */}
          <div style={{margin:"4rem auto 0",maxWidth:900}}>
            <div style={{background:"linear-gradient(135deg,rgba(27,58,27,.9),rgba(15,40,15,1))",border:"1px solid rgba(196,137,58,.3)",borderRadius:24,overflow:"hidden",marginBottom:"3rem"}}>
              {/* Top header */}
              <div style={{padding:"32px 36px 24px",borderBottom:"1px solid rgba(196,137,58,.15)"}}>
                <div style={{fontSize:".62rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:10}}>✦ The Prayer Companion · Powered by 2amcompanion.com</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.4rem,2.5vw,2rem)",color:"white",marginBottom:12,lineHeight:1.25}}>
                  Touch your ring.<br/>Hear a voice.<br/><em style={{color:"var(--gold)"}}>Pray together.</em>
                </div>
                <p style={{fontSize:".9rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.8,maxWidth:600}}>
                  Every Vibe Shift Ring ships connected to a living library of recorded prayers at 2amcompanion.com -- built for the moments life actually brings. A real voice. A real prayer. Right when you need it.
                </p>
              </div>
              {/* How it works row */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:0}}>
                {[
                  {step:"1",icon:"💍",title:"Touch your ring",desc:"Hold your Vibe Shift Ring near the top of your NFC-enabled phone or tablet."},
                  {step:"2",icon:"📱",title:"Your phone opens",desc:"No app needed. The prayer companion opens instantly in your browser."},
                  {step:"3",icon:"🎙",title:"A real voice prays",desc:"A recorded prayer begins -- matched to your ring's intention and your moment."},
                  {step:"4",icon:"🙏",title:"You're not alone",desc:"Pray along, or simply listen. Someone is always there to pray with you."},
                ].map((s,i)=>(
                  <div key={s.step} style={{padding:"22px 24px",borderRight:i<3?"1px solid rgba(255,255,255,.06)":"none",borderTop:"1px solid rgba(196,137,58,.1)"}}>
                    <div style={{fontSize:"1.6rem",marginBottom:8}}>{s.icon}</div>
                    <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:4}}>Step {s.step}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"white",marginBottom:6}}>{s.title}</div>
                    <div style={{fontSize:".76rem",color:"rgba(255,255,255,.45)",lineHeight:1.6,fontWeight:300}}>{s.desc}</div>
                  </div>
                ))}
              </div>
              {/* Personalization callout */}
              <div style={{padding:"24px 36px",borderTop:"1px solid rgba(196,137,58,.15)",background:"rgba(0,0,0,.2)"}}>
                <div style={{display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:240}}>
                    <div style={{fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6}}>🔗 Customize Your Link</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"white",marginBottom:6}}>Want something made just for you?</div>
                    <p style={{fontSize:".8rem",color:"rgba(255,255,255,.5)",fontWeight:300,lineHeight:1.75}}>
                      Every ring ships with a default prayer library tied to its intention. But if you'd like something personal -- a specific occasion, a loved one's name, a scripture, a season of life -- include a note with your order. We'll send your custom link with your order confirmation.
                    </p>
                  </div>
                  <div style={{background:"rgba(196,137,58,.1)",border:"1px solid rgba(196,137,58,.25)",borderRadius:16,padding:"18px 20px",minWidth:220,flexShrink:0}}>
                    <div style={{fontSize:".68rem",color:"rgba(196,137,58,.8)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>What to include</div>
                    {["An occasion or season","A name or dedication","A scripture or verse","A feeling or need"].map(item=>(
                      <div key={item} style={{display:"flex",gap:8,alignItems:"center",padding:"4px 0",fontSize:".78rem",color:"rgba(255,255,255,.6)"}}>
                        <span style={{color:"var(--gold)",fontSize:".55rem"}}>✦</span>{item}
                      </div>
                    ))}
                    <div style={{marginTop:12,fontSize:".7rem",color:"rgba(255,255,255,.35)",fontStyle:"italic",lineHeight:1.5}}>Your custom prayer link arrives with your order confirmation.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW IT WORKS */}
            <div style={{textAlign:"center",marginBottom:"2rem"}}>
              <div style={{fontSize:".66rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--gold)",marginBottom:8}}>The Ring</div>
              <h2 id="sec-rings-how" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.5rem,2.5vw,2.2rem)",color:"white",fontWeight:400}}>How it actually works</h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16,marginBottom:"3rem"}}>
              {[
                {icon:"🔄", title:"Spinning outer band", desc:"The textured outer band spins freely around the solid inner core. Smooth, silent rotation -- no clicking, no noise."},
                {icon:"✋", title:"Tactile grounding", desc:"The physical sensation of spinning pulls your nervous system's attention to your hands -- quieting the mental noise."},
                {icon:"✨", title:"Meridian Infused", desc:"After printing, every ring receives our proprietary Meridian Infusion Frequency finishing process. Intention in every piece."},
                {icon:"🙏", title:"Tap to Pray", desc:"Touch your ring to any NFC-enabled phone. A real voice from 2amcompanion.com prays with you -- instantly, no app needed."},
              ].map(f=>(
                <div key={f.title} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:18,padding:"22px"}}>
                  <div style={{fontSize:"1.6rem",marginBottom:10}}>{f.icon}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"white",marginBottom:6}}>{f.title}</div>
                  <div style={{fontSize:".78rem",color:"rgba(255,255,255,.5)",lineHeight:1.6,fontWeight:300}}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* MERIDIAN INFUSION — Science + Belief section */}
            <div style={{background:"linear-gradient(160deg,#0A1A0A,#0E1A1A)",border:"1px solid rgba(196,137,58,.2)",borderRadius:24,padding:"36px",marginBottom:"2.5rem",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-20,right:-20,fontSize:"12rem",opacity:.03,pointerEvents:"none",lineHeight:1}}>◎</div>

              {/* Header */}
              <div style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:10}}>✦ The Science Behind the Ring</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.2rem,2.2vw,1.7rem)",color:"white",marginBottom:8,lineHeight:1.3}}>
                <span id="sec-rings-meridian"/>The Meridian Infusion <em style={{color:"var(--gold)"}}>Process</em>
              </div>
              <p style={{fontSize:".88rem",color:"rgba(255,255,255,.6)",fontWeight:300,lineHeight:1.85,marginBottom:"1.8rem",maxWidth:600}}>
                Every Vibe Shift Ring is finished with our proprietary Meridian Infusion process — an intentional alignment of the ring's vibrational field with one of nine sacred frequencies before it reaches you. Each frequency is chosen by Hz and aligned to a specific intention.
              </p>

              {/* The plastic question — addressed directly */}
              <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:"22px 24px",marginBottom:"1.6rem"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",color:"rgba(255,255,255,.8)",marginBottom:12,fontStyle:"italic"}}>"But it's plastic — how can plastic hold a frequency?"</div>
                <p style={{fontSize:".82rem",color:"rgba(255,255,255,.55)",fontWeight:300,lineHeight:1.85,marginBottom:10}}>
                  We'd ask the forensic scientist who identifies every type of plastic by its unique <strong style={{color:"rgba(255,255,255,.8)"}}>molecular vibration frequency</strong> using infrared spectroscopy. We'd ask the engineer who bonds plastic medical devices together using <strong style={{color:"rgba(255,255,255,.8)"}}>ultrasonic sound frequency</strong>. We'd ask the child who burned their hand on a plastic cup — because plastic <strong style={{color:"rgba(255,255,255,.8)"}}>held the heat</strong>. And heat is molecular vibration.
                </p>
                <p style={{fontSize:".82rem",color:"rgba(255,255,255,.55)",fontWeight:300,lineHeight:1.85}}>
                  Everything vibrates. Rocks. Wood. Water. Plastic. A piece of granite on a mountainside has a resonant frequency. Nothing is inert. The Meridian Infusion doesn't require the ring to be organic — it requires it to have a vibrational field. And all matter already does.
                </p>
              </div>

              {/* The belief bridge */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14,marginBottom:"1.6rem"}}>
                {[
                  {icon:"🔬", title:"Real Science", desc:"Infrared spectroscopy identifies every plastic by its molecular vibration signature. Ultrasonic welders bond plastic at 20,000–40,000 Hz. The frequency relationship with plastic is already industrial fact."},
                  {icon:"🌊", title:"Cymatics", desc:"Frequency moves physical matter. Cymatics visually shows us how different frequencies create measurable, repeatable patterns in sand and water. Sound shapes the physical world."},
                  {icon:"🧲", title:"The Invisible Forces", desc:"Gravity you cannot see — but it holds you. WiFi you cannot see — but it connects you. Magnetism you cannot see — but it moves metal. We live inside invisible forces every moment of every day."},
                  {icon:"🙏", title:"Intention Matters", desc:"Across every culture in human history, objects have been blessed, charged, and consecrated. The mechanism differs. The intention is universal. The Meridian Infusion is that ancient practice, precisely applied."},
                ].map(f=>(
                  <div key={f.title} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,padding:"18px"}}>
                    <div style={{fontSize:"1.5rem",marginBottom:8}}>{f.icon}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"white",marginBottom:6}}>{f.title}</div>
                    <div style={{fontSize:".74rem",color:"rgba(255,255,255,.45)",lineHeight:1.65,fontWeight:300}}>{f.desc}</div>
                  </div>
                ))}
              </div>

              {/* The closing belief statement */}
              <div style={{textAlign:"center",padding:"20px 0 4px",borderTop:"1px solid rgba(196,137,58,.15)"}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(.95rem,1.6vw,1.2rem)",fontStyle:"italic",color:"rgba(255,255,255,.72)",lineHeight:1.75,maxWidth:600,margin:"0 auto"}}>
                  "We cannot show you a frequency. Neither can anyone show you gravity, or love, or the moment music moves a stranger to tears. And yet all of those things hold you, move you, and change you every single day. Those who feel it, know."
                </p>
                <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.55)",marginTop:12}}>— The Meridian Infusion · Chai Holistic</div>
              </div>
            </div>

            {/* Colors */}
            <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"28px",marginBottom:"2rem"}}>
              <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"white",marginBottom:4}}>Available Colors</div>
                <div style={{fontSize:".76rem",color:"rgba(255,255,255,.4)",fontWeight:300}}>Every style available in your vibe</div>
              </div>
              <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap"}}>
                {[
                  {name:"Matte Black", hex:"#2A2A2A"},
                  {name:"Electric Blue", hex:"#1A4A8A"},
                  {name:"Sunset Gold", hex:"#C4893A"},
                  {name:"Ghost White", hex:"#E8E8E8"},
                  {name:"Deep Red", hex:"#8B1A1A"},
                ].map(col=>(
                  <div key={col.name} style={{textAlign:"center"}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:col.hex,margin:"0 auto 6px",border:"2px solid rgba(255,255,255,.15)",boxShadow:"0 4px 12px rgba(0,0,0,.4)"}}/>
                    <div style={{fontSize:".65rem",color:"rgba(255,255,255,.5)",letterSpacing:".06em"}}>{col.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quotes */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:"1.5rem"}}>
              <div style={{textAlign:"center",padding:"28px",background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.2)",borderRadius:20}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontStyle:"italic",color:"white",marginBottom:0,lineHeight:1.6}}>
                  "You can't always control the chaos.<br/>But you can shift your vibe."
                </p>
              </div>
              <div style={{textAlign:"center",padding:"28px",background:"rgba(45,74,45,.3)",border:"1px solid rgba(196,137,58,.2)",borderRadius:20}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontStyle:"italic",color:"white",marginBottom:0,lineHeight:1.6}}>
                  "Sometimes we all just need<br/>someone to pray with us."
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{textAlign:"center",padding:"14px",borderRadius:12}}>
              <p style={{fontSize:".7rem",color:"rgba(255,255,255,.28)",lineHeight:1.6,fontWeight:300}}>
                Not a medical device. Meridian Infusion Frequency is a proprietary finishing process, not a health treatment. NFC tap feature works on most modern smartphones and tablets with NFC capability enabled. A tool designed to help you feel more present -- and less alone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }

  // --- MAIN RENDER ----------------------------------------------------------
  return (
    <>
      <style>{CSS}</style>
      <div ref={topRef} style={{position:"absolute",top:0,left:0}}/>

      <nav>
        <div className="nav-logo" onClick={()=>{ nav("home"); window.scrollTo({top:0,behavior:"smooth"}); setMobMenuOpen(false); }} title="Home">
          <img src="/chai_holistic.jpg" alt="Chai Holistic" className="nav-logo-img"/>
          <div className="nav-logo-text">
            <span>Chai Holistic</span>
            <span>Sip &amp; Heal</span>
          </div>
        </div>
        <div className="nav-links">
          {[["home","🏠 Home"],["shop","Shop"],["recipes","🍵 Brew Rituals"],["men","⚡ Men's"],["supplements","💊 Supplements"],["ancestral","🌿 Ancestral"],["mocktails","🍹 Mocktails"],["jelly","🌊 Jelly"],["seamoss","🌿 Sea Moss"],["rings","Rings"],["faq","FAQ"],["tea-library","📚 Tea Library"]].map(([p,l])=>(
            <span key={p} className={`nav-lnk ${page===p?"on":""}`} onClick={()=>nav(p)}>
              {l}
              {p==="men" && <span style={{marginLeft:5,fontSize:".48rem",letterSpacing:".1em",background:"var(--gold)",color:"white",padding:"2px 6px",borderRadius:50,fontWeight:600,verticalAlign:"middle",textTransform:"uppercase"}}>NEW</span>}
              {p==="supplements" && <span style={{marginLeft:5,fontSize:".48rem",letterSpacing:".1em",background:"var(--sage-d)",color:"white",padding:"2px 6px",borderRadius:50,fontWeight:600,verticalAlign:"middle",textTransform:"uppercase"}}>NEW</span>}
              {p==="ancestral" && <span style={{marginLeft:5,fontSize:".48rem",letterSpacing:".1em",background:"#6A4A2A",color:"white",padding:"2px 6px",borderRadius:50,fontWeight:600,verticalAlign:"middle",textTransform:"uppercase"}}>NEW</span>}
            </span>
          ))}
          <span className="nav-lnk" onClick={()=>setProfileOpen(true)}
            style={{background:"linear-gradient(135deg,rgba(192,136,48,.18),rgba(192,136,48,.08))",color:"var(--gold)",padding:"4px 14px",borderRadius:50,border:"1px solid rgba(196,137,58,.4)",opacity:1,borderBottom:"none",fontWeight:500}}>
            📋 Sip &amp; Heal Report
          </span>
          <span className="nav-lnk"
            onClick={()=>{setIntentionOpen(true);setIntentionStep(0);setIntentionData({});setIntentionResult(null);}}
            style={{background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",color:"var(--gold)",padding:"4px 14px",borderRadius:50,border:"1px solid rgba(196,137,58,.4)",opacity:1,borderBottom:"none",fontWeight:500}}>
            🌿 Sip &amp; Seek
          </span>
        </div>
        <div className="nav-right">
          <button className="cart-btn" onClick={()=>setCartOpen(true)}>
            Basket {cartCount>0&&<span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="ham-btn" onClick={()=>setMobMenuOpen(o=>!o)} aria-label="Menu">
            <span style={{transform:mobMenuOpen?"rotate(45deg) translate(5px,5px)":"none"}}/>
            <span style={{opacity:mobMenuOpen?0:1}}/>
            <span style={{transform:mobMenuOpen?"rotate(-45deg) translate(5px,-5px)":"none"}}/>
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-down menu ── */}
      <div className={`mob-menu${mobMenuOpen?" open":""}`}>
        {[["home","🏠 Home"],["shop","🛍 Shop"],["recipes","🍵 Brew Rituals"],["men","⚡ Men's Wellness"],["supplements","💊 Vitamins & Minerals"],["ancestral","🌿 Ancestral Teas"],["mocktails","🍹 Mocktails"],["jelly","🌊 Jelly Kits"],["seamoss","🌿 Sea Moss Gel"],["rings","💫 Vibe Shift Rings"],["faq","❓ FAQ"],["tea-library","📚 Tea Library"]].map(([p,l])=>(
          <div key={p} className="mob-lnk" onClick={()=>{nav(p);setMobMenuOpen(false);}}>
            <span>{l}{p==="men"&&<span style={{marginLeft:8,fontSize:".48rem",background:"var(--gold)",color:"white",padding:"2px 7px",borderRadius:50,fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",verticalAlign:"middle"}}>NEW</span>}{p==="supplements"&&<span style={{marginLeft:8,fontSize:".48rem",background:"var(--sage-d)",color:"white",padding:"2px 7px",borderRadius:50,fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",verticalAlign:"middle"}}>NEW</span>}{p==="ancestral"&&<span style={{marginLeft:8,fontSize:".48rem",background:"#6A4A2A",color:"white",padding:"2px 7px",borderRadius:50,fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",verticalAlign:"middle"}}>NEW</span>}</span>
            <span style={{color:"var(--dust)"}}>›</span>
          </div>
        ))}
        <div className="mob-lnk mob-lnk-special" onClick={()=>{setProfileOpen(true);setMobMenuOpen(false);}}>
          📋 Get My Sip &amp; Heal Report <span style={{color:"var(--gold)"}}>›</span>
        </div>
        <div className="mob-lnk mob-lnk-special" onClick={()=>{setIntentionOpen(true);setIntentionStep(0);setIntentionData({});setIntentionResult(null);setMobMenuOpen(false);}}>
          🌿 Sip &amp; Seek <span style={{color:"var(--gold)"}}>›</span>
        </div>
        <div className="mob-lnk" onClick={()=>{setCartOpen(true);setMobMenuOpen(false);}}>
          🛒 Cart {cartCount>0&&`(${cartCount})`} <span style={{color:"var(--dust)"}}>›</span>
        </div>
      </div>

      {/* SITEWIDE FDA BAR — removed, now in footer */}

      {/* PAGES   always stay mounted so scroll position is never lost */}
      <div style={{display: twoAM ? "none" : "block"}}>
        {page==="home"&&<Home/>}
        {page==="shop"&&<Shop/>}
        {page==="recipes"&&<Recipes/>}
        {page==="mocktails"&&<MocktailsPage/>}
        {page==="jelly"&&<JellyPage onAddToCart={addToCart}/>}
        {page==="seamoss"&&<SeaMossPage onAddToCart={addToCart}/>}
        {page==="rings"&&<Rings/>}

      {/* RINGS PAGE — MOBILE STICKY CUSTOMIZE BAR */}
      {page==="rings" && !ringConfig && (
        <div className="rings-mob-cta">
          <div className="rings-mob-cta-txt">
            <strong>◎ Customize Your Ring</strong>
            Design · Size · Color · NFC Prayer Link
          </div>
          <button className="rings-mob-cta-btn"
            onClick={()=>{setRingConfig({ring:null});setRcStep(1);setRcDesign(null);setRcSize(null);setRcFreq(null);setRcOuterColor(null);setRcInnerColor(null);setRcPrayerLink(null);setRcLinkUrl('');setRcLinkTestShown(false);setRcLinkAttempts(0);setRcOrderConfirmed(false);}}>
            Build Mine →
          </button>
        </div>
      )}
        {page==="faq"&&<FAQPage/>}
        {page==="men"&&<MensWellness onNav={nav} onAddToCart={addToCart}/>}
        {page==="supplements"&&<SupplementsPage onNav={nav}/>}
        {page==="ancestral"&&<AncestralTeas onNav={nav}/>}
        {page==="tea-library"&&<TeaLibrary deepBlend={teaLibraryBlend} onDeepBlendConsumed={()=>setTeaLibraryBlend(null)} onAddToCart={addToCart}/>}
      </div>

      {/* 2AM OVERLAY   floats on top; page underneath stays mounted */}
      {twoAM && <TwoAMOverlay/>}

      {/* TIMER OVERLAYS   mutually exclusive, clean state, show over everything */}
      {timerDone && <TeaReadyScreen/>}
      {!timerDone && (timerOn || timerSec !== null) && <LargeTimerOverlay/>}

      {/* MODALS */}
      {/* RING CONFIGURATOR */}
      {ringConfig && <RingConfigurator/>}

      {/* WELCOME   shows on first visit after 1.8 seconds */}
      {showWelcome && <WelcomeModal/>}

      {intentionOpen && <IntentionEngine/>}
      {finderOpen && <TeaFinderModal/>}
      {selectedBlend && <BlendModal blend={selectedBlend} onClose={()=>setSelectedBlend(null)}/>}

      {saveRitualOpen && cart.length > 0 && <SaveRitualModal/>}
      {activeRecipe && <RecipeModal/>}
      {ritualOpen && <RitualBuilderModal/>}
      {trackerOpen && <CleanseTrackerModal/>}
      {bookPreview && <BookPreviewModal/>}

      <WellnessProfileModal open={profileOpen} onClose={()=>setProfileOpen(false)}/>

      <CartDrawer/>

      {/* 2AM BUTTON   hidden while overlay is open */}
      {!twoAM && (
        <button className="twoam-btn" onClick={open2AM}>
          {isNight?"✨ Can't sleep?":"🌙 2AM Mode"}
        </button>
      )}

      {/* FLOATING SIP & HEAL REPORT CTA */}
      {!twoAM && !showWelcome && !profileOpen && welcomeSeen && (
        <button
          onClick={()=>setProfileOpen(true)}
          style={{position:"fixed",bottom:136,left:28,zIndex:398,background:"linear-gradient(135deg,rgba(192,136,48,.9),rgba(180,120,30,.95))",color:"white",border:"1px solid rgba(255,255,255,.25)",padding:"9px 18px",borderRadius:50,fontFamily:"Jost,sans-serif",fontSize:".65rem",letterSpacing:".1em",cursor:"pointer",boxShadow:"0 4px 18px rgba(192,136,48,.4)",whiteSpace:"nowrap"}}
          title="Get your free Sip &amp; Heal Report">
          🌿 Free Sip &amp; Heal Report
        </button>
      )}

      {/* FLOATING SIP & SEEK   always accessible while browsing */}
      {!twoAM && !showWelcome && !intentionOpen && welcomeSeen && (
        <button
          onClick={()=>{setIntentionOpen(true);setIntentionStep(0);setIntentionData({});setIntentionResult(null);}}
          style={{position:"fixed",bottom:90,left:28,zIndex:398,background:"linear-gradient(135deg,#2D4A2D,#1B3A1B)",color:"rgba(255,255,255,.85)",border:"1px solid rgba(196,137,58,.4)",padding:"9px 18px",borderRadius:50,fontFamily:"Jost,sans-serif",fontSize:".65rem",letterSpacing:".1em",cursor:"pointer",boxShadow:"0 4px 18px rgba(45,74,45,.35)",animation:"sipSeekPulse 4s ease-in-out infinite",whiteSpace:"nowrap"}}
          title="Open Sip &amp; Seek">
          🌿 Sip &amp; Seek
        </button>
      )}
      <style>{`@keyframes sipSeekPulse{0%,100%{box-shadow:0 4px 18px rgba(45,74,45,.35)}50%{box-shadow:0 4px 28px rgba(196,137,58,.4)}}`}</style>

      {!twoAM && (PAGE_SECTIONS[page]||[]).length > 0 && (
        <div className="sec-nav">
          {(PAGE_SECTIONS[page]||[]).map(([lbl,id],i)=>(
            <div key={id} className="sec-dot-wrap" onClick={()=>{
              if(id==="home-page-rings"){
                // Go home AND scroll to the Vibe Shift rings section
                nav("home");
                setTimeout(()=>{const el=document.getElementById("sec-vibe-rings");if(el)el.scrollIntoView({behavior:"smooth",block:"start"});},300);
              } else if(id==="home-page"){
                nav("home");
                setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),300);
              } else {
                // For all section IDs (including -top ones) use scrollIntoView
                const el=document.getElementById(id);
                if(el) el.scrollIntoView({behavior:"smooth",block:"start"});
              }
            }}>
              <span className="sec-dot-lbl">{lbl}</span>
              <div className={`sec-dot ${activeSecIdx===i?"active":""}`}/>
            </div>
          ))}
        </div>
      )}

      {/* BACK TO TOP BUTTON */}
      <button
        className={`back-top ${showBackTop?"visible":""}`}
        onClick={() => { topRef.current && topRef.current.scrollIntoView({behavior:"smooth"}); }}
        title="Back to top"
      >↑</button>

      {notif && <div className="toast">{notif}</div>}

      {/* FDA DISCLAIMER BAND */}
      <div style={{background:"#2A1F15",padding:"20px 2.5rem",borderTop:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{maxWidth:"1280px",margin:"0 auto"}}>
          <p style={{fontSize:".72rem",color:"rgba(255,255,255,.45)",lineHeight:1.8,fontWeight:300,textAlign:"center",letterSpacing:".01em"}}>
            <strong style={{color:"rgba(255,255,255,.65)",letterSpacing:".06em",textTransform:"uppercase",fontSize:".66rem"}}>Important Disclaimer · </strong>
            These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.
            Herbal products are not a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician or qualified healthcare provider before
            beginning any herbal regimen, especially if you are pregnant, nursing, taking prescription medications, or have an existing medical condition.
            Individual results may vary. Some herbs may interact with medications -- see our <span style={{color:"var(--gold)",cursor:"pointer",textDecoration:"underline"}} onClick={()=>nav("faq")}>Safety FAQ</span> for details.
          </p>
        </div>
      </div>

      <footer>
        <div className="ft-in">
          <div className="ft-grid">
            <div>
              <div className="ft-brand">Chai Holistic</div>
              <div className="ft-sub">Rooted in healing. Crafted with intention. Every cup, a conversation with what your body already knows. © 2026 Chai Holistic LLC</div>
            </div>
            <div>
              <div className="ft-col-h">Shop</div>
              <span className="ft-lnk" style={{color:"var(--gold)",fontWeight:500}} onClick={()=>addToCart({id:"book1",name:"Sip & Heal: The Chai Holistic Collection",price:24.99,emoji:"📖"})}>📖 Sip &amp; Heal Book -- $24.99</span>
              {[["Tea Blends","shop"],["Cleansing Blends","shop"],["Individual Herbs","shop"],["Bundle & Save","shop"],["⚡ Men's Wellness","men"],["💊 Vitamins & Minerals","supplements"],["🌿 Ancestral Teas","ancestral"],["Vibe Shift Rings","rings"]].map(([l,p])=><span key={l} className="ft-lnk" onClick={()=>nav(p)}>{l}</span>)}
            </div>
            <div>
              <div className="ft-col-h">Features</div>
              <span className="ft-lnk" onClick={()=>setProfileOpen(true)}>🌿 Sip &amp; Heal Report</span>
              <span className="ft-lnk" onClick={()=>{setIntentionOpen(true);setIntentionStep(0);setIntentionData({});setIntentionResult(null);}}>🌿 Sip &amp; Seek</span>
              <span className="ft-lnk" onClick={()=>nav("mocktails")}>🍹 Mocktail Recipes</span>
              <span className="ft-lnk" onClick={()=>nav("jelly")}>🌊 Jelly Kits</span>
              <span className="ft-lnk" onClick={()=>nav("seamoss")}>🌿 Sea Moss Gel</span>
              <span className="ft-lnk" style={{opacity:.55,cursor:"default"}}>💊 Supplements <em style={{fontSize:".6rem",color:"var(--gold)"}}>· Coming Soon</em></span>
              <span className="ft-lnk" onClick={()=>setFinderOpen(true)}>✦ Find My Tea</span>
              <span className="ft-lnk" onClick={()=>setRitualOpen(true)}>☀ Build My Ritual</span>
              <span className="ft-lnk" onClick={()=>setTrackerOpen(true)}>🌿 Cleanse Tracker</span>
              <span className="ft-lnk" onClick={()=>nav("faq")}>FAQ &amp; Safety Guide</span>
              <span className="ft-lnk" onClick={()=>nav("faq")}>🌡 Brewing Guide</span>
              <span className="ft-lnk" onClick={open2AM}>🌙 2AM Mode</span>
            </div>
            <div>
              <div className="ft-col-h">Our Universe</div>
              <span className="ft-lnk">chaiholistic.com</span>
              <span className="ft-lnk">spiralinterrupt.com</span>
              <span className="ft-lnk">2amcompanion.com</span>
            </div>
          </div>

          <hr className="ft-div"/>
          <div className="ft-bot">
            <span className="ft-copy">© 2026 Chai Holistic LLC · All Rights Reserved</span>
            <button onClick={()=>{ nav("home"); window.scrollTo({top:0,behavior:"smooth"}); }} style={{background:"none",border:"1px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.4)",padding:"6px 16px",borderRadius:50,fontSize:".65rem",cursor:"pointer",fontFamily:"Jost,sans-serif",letterSpacing:".08em",transition:"all .2s"}}
              onMouseEnter={e=>{e.target.style.color="var(--gold)";e.target.style.borderColor="var(--gold)";}}
              onMouseLeave={e=>{e.target.style.color="rgba(255,255,255,.4)";e.target.style.borderColor="rgba(255,255,255,.15)";}}>
              ↑ Back to Top
            </button>
          </div>
          <p style={{marginTop:"16px",textAlign:"center",fontSize:".63rem",color:"rgba(255,255,255,.22)",lineHeight:1.6,fontWeight:300,letterSpacing:".02em"}}>
            These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use.
          </p>
        </div>
      </footer>
    </>
  );
}
