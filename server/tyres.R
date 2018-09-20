lmtudo = all = NA
loadFiles <- function (coldfile="frio.csv", warmfile="quente.csv"){
  frio = read.csv("frio.csv")
  quente = read.csv("quente.csv")
  set.seed(12345)
  frio$Track.temp = jitter(frio$Track.temp, factor = 10, 1)
  frio$Ambient.temp = jitter(frio$Ambient.temp, factor = 10, 1)
  quente$Track.temp = jitter(quente$Track.temp, factor = 10, 1)
  quente$Ambient.temp = jitter(quente$Ambient.temp, factor = 10, 1)
  all <<- rbind(quente, frio)
}

plotRelation <- function (){
  plot (all$Tyre.wear.FR ~ all$Current.time, 
        col= all$Lap.number, main="Tyre wear", cex=0.5,
        xlab="Time in seconds", ylab="Tyre wear (in %)"
        )
  legend(1, 3.8, legend=c("Warm", "Cold"),
         col=c("magenta", "blue"), lty=1:1, cex=0.8,
         title="Line color", text.font=4, bg='lightblue')
}

createModel <- function (){
#lmfrio = lm ( Tyre.wear.FR ~ Ambient.temp + Track.temp + Current.time, data = frio)
#lmquente = lm ( Tyre.wear.FR ~ Ambient.temp + Track.temp + Current.time, data = quente)
lmtudo <<- lm ( Tyre.wear.FR ~ Ambient.temp + Track.temp + Current.time, data = all)
#predict(lmtudo, list(Ambient.temp=40, Track.temp=48, Current.time = 6550))
}


#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#* @param atemp ambient temperature
#* @param ttemp track temperature
#* @param time current time (in seconds)
#* @get /predict
function(atemp=30, ttemp=30, time=30){
  atemp = as.numeric(atemp)
  ttemp = as.numeric(ttemp)
  time = as.numeric(time)
  predict(lmtudo, list(Ambient.temp=atemp, Track.temp=ttemp, Current.time = time))
}


loadFiles()
createModel()

