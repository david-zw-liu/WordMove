require 'bing_translator'
require 'unirest'
require 'giphy'
require 'securerandom'

#ch = translator.translate('Hello. This will be translated!', :to => 'zh-CHT')

class WordMoveService

  def initialize
    @api_url = 'http://api.bosonnlp.com/tag/analysis?space_mode=0&oov_level=3&t2s=0&&special_char_conv=0'
    @api_key = 'pV4Cxcw4.4754.x8oRfPPDFTEc'
    @translator = BingTranslator.new(
        '01ab6b40-48b2-4dd9-b77f-c5b2424e0e58',
        '79tgG+uw2vqm/27XwEHo8Jygc+F9wHHhjnGLnPbONCA',
        false,
        '79tgG+uw2vqm/27XwEHo8Jygc+F9wHHhjnGLnPbONCA'
    )

    # puts "翻譯額度：#{@translator.balance}"
  end

  def work(article)
    @article = article
    if(!article.nil?)
      split_words
      translate_words
      word_to_gif
      generate_result
      setSound
    end
    @result
  end

  private
  def split_words
    puts '分詞中...'
    response = Unirest.post @api_url,
                            headers:{
                                'Accept' => "application/json",
                                'Content-Type' => "application/json",
                                'X-Token' => @api_key

                            },
                            parameters: [@article].to_json

    if response.code == 200
      body = response.body.first
      @tags = body['tag']
      @words = body['word']
    end
  end

  def translate_words
    puts '翻譯中...'
    begin
      @en_words = @translator.translate_array(@words, :to => 'en')
    rescue Exception => e
      puts e
      retry
    end
  end

  def word_to_gif
    puts '搜圖中...'

    @word_to_gifs = {}
    @word_to_recommend_index = {}

    @tags.each_with_index do |t, i|
      if need_words? t
        word = Word.find_by(zh_word: @words[i])
        if word.nil?
          @word_to_gifs[@words[i].to_sym] = Giphy.search(@en_words[i], limit: 5).map{|g| g.fixed_height_image.url.to_s }
        else
          @word_to_gifs[@words[i].to_sym] = word.gifs.map { |g| g.url }
          if word.gifs.map{|g| g.count}.each_with_index.max[0] > 0
            @word_to_recommend_index[@words[i].to_sym] = word.gifs.map{|g| g.count}.each_with_index.max[1]
          end
        end
      end
    end
  end

  def need_words?(tag)
    allow_tags = %w{ n nr nr1 nrf ns nt nz nl v vi vl z }
    allow_tags.include? tag
  end

  def generate_result
    puts "產生結果..."
    @result = []

    no_images_string = ""
    @words.each_with_index do |w, i|
      if need_words? @tags[i] || @word_to_gifs[w.to_sym].count != 0
        if(!no_images_string.empty?)
          @result << { sentence: no_images_string, recommend_index: nil, en_sentence: nil, tag: nil, images: [], selectable: false , sound: nil }
          no_images_string = ""
        end
        @result << { sentence: w, en_sentence: @en_words[i], tag: @tags[i], images: @word_to_gifs[w.to_sym],
                     recommend_index: (@word_to_recommend_index[w.to_sym] rescue nil), selectable: true , sound: nil }
      else
        no_images_string << w
      end
    end

    if(!no_images_string.empty?)
      @result << { sentence: no_images_string, recommend_index: nil, en_sentence: nil, tag: nil, images: [], selectable: false , sound: nil }
    end
  end

  def setSound()
    puts "產生TTS..."
    @result.each do |r|
      begin
        hash = SecureRandom.hex(12);
        word = Word.find_by(zh_word: r[:sentence])
        puts (!word)
        if(!word)
          `say '#{r[:sentence]}' -o #{Rails.root.join('public', 'sounds')}/#{hash}.wav --data-format=LEF32@8000`
          r[:sound] = "/sounds/#{hash}.wav"
        else
          r[:sound] = word.sound_path
        end
      rescue Exception => e
        retry
      end
    end

    @result.each do |r|
      word = Word.find_by(zh_word: r[:sentence])
      if !word
        w = Word.new
        w.zh_word = r[:sentence]
        w.en_word = r[:en_sentence]
        w.sound_path = r[:sound]
        w.save
        r[:images].each do |url|
          w.gifs.create(url: url, count: 0)
        end

      end
    end
  end
end
